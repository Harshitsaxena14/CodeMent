// CodeMent Extension - Main Popup Controller

import { showState } from "./utils/render.js";
import { checkBackendHealth } from "./services/api.js";
import { getStorageData, setStorageData } from "./services/storage.js";
import { formatSlugToTitle, extractProblemSlugFromPathname } from "./utils/helpers.js";
import { 
  renderProblemCard, 
  renderPatternGuidance, 
  renderComplexityGuidance, 
  renderLogicGuidance, 
  renderEdgeCasesGuidance 
} from "./components/ProblemCard.js";
import { initTimer } from "./components/Timer.js";
import { initButtons } from "./components/Buttons.js";
import { renderFooter } from "./components/Footer.js";

// Centralized ProblemState - The Single Source of Truth
const ProblemState = {
  slug: null,
  metadata: null,
  solved: false,
  timer: null,           // { startTime, endTime, duration, solved }
  syncStatus: "synced",  // "synced" | "pending" | "error"
  failureStatus: null,   // Wrong Answer / TLE diagnostic or null
  activeLanguage: "JavaScript"
};

let activeRequestSlug = null;
let currentAbortController = null;

// Synchronize auth credentials automatically from active web dashboard tab
function syncAuthToken(callback) {
  if (typeof chrome !== "undefined" && chrome.tabs && chrome.scripting) {
    chrome.tabs.query({ url: "*://localhost:5173/*" }, (tabs) => {
      if (tabs && tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            return {
              token: localStorage.getItem("token"),
              guestMode: localStorage.getItem("guestMode")
            };
          }
        }, (results) => {
          if (results && results[0] && results[0].result) {
            const { token, guestMode } = results[0].result;
            setStorageData({ token, guestMode }, callback);
          } else {
            if (callback) callback();
          }
        });
      } else {
        if (callback) callback();
      }
    });
  } else {
    if (callback) callback();
  }
}

function isLeetCodeUrl(urlStr) {
  if (!urlStr) return false;
  try {
    const url = new URL(urlStr);
    return url.hostname.includes("leetcode.com") || url.hostname.includes("localhost") || url.hostname.includes("127.0.0.1");
  } catch (e) {
    return urlStr.includes("leetcode.com") || urlStr.includes("localhost") || urlStr.includes("127.0.0.1");
  }
}

// Scrape active editor language from LeetCode
function detectEditorLanguage(callback) {
  if (typeof chrome !== "undefined" && chrome.tabs && chrome.scripting) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.url && isLeetCodeUrl(activeTab.url)) {
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          func: () => {
            const dropdown = document.querySelector(".text-xs.font-medium, button[id*=\"language\"]");
            return dropdown ? dropdown.textContent.trim() : "JavaScript";
          }
        }, (results) => {
          const lang = (results && results[0] && results[0].result) ? results[0].result : "JavaScript";
          callback(lang);
        });
      } else {
        callback("JavaScript");
      }
    });
  } else {
    callback("JavaScript");
  }
}

// Synchronize UI elements with the single source of truth (ProblemState)
function syncUI(isBackendConnected) {
  if (!ProblemState.slug) {
    showState("empty");
    renderFooter(null, isBackendConnected);
    return;
  }

  showState("active");

  // 1. Render core details card
  renderProblemCard(ProblemState.metadata, ProblemState.solved);

  // 2. Refresh/Freeze timer
  const timerElement = document.getElementById("solvingTimer");
  initTimer(ProblemState.slug, timerElement, ProblemState.timer);

  // 3. Render metadata classification badge
  const metadataBadge = document.getElementById("metadataBadge");
  if (metadataBadge) {
    const source = ProblemState.metadata.source || "official";
    metadataBadge.className = "badge";
    if (source === "AI") {
      metadataBadge.textContent = "AI Generated";
      metadataBadge.classList.add("badge-ai");
    } else if (source === "Estimated") {
      metadataBadge.textContent = "Estimated";
      metadataBadge.classList.add("badge-estimated");
    } else {
      metadataBadge.textContent = "Official";
      metadataBadge.classList.add("badge-official");
    }
  }

  // 4. Render failure warning card
  const failureCard = document.getElementById("failureStatusCard");
  const failureText = document.getElementById("failureStatusText");
  if (failureCard) {
    if (ProblemState.failureStatus) {
      failureCard.classList.remove("hidden");
      if (failureText) {
        failureText.textContent = `Code Failed: ${ProblemState.failureStatus} ❌`;
      }
    } else {
      failureCard.classList.add("hidden");
    }
  }

  // 5. Initialize action buttons
  initButtons(ProblemState.slug, ProblemState.metadata.topicId);

  // 6. Initialize stuck guide panel clicks
  initStuckWorkflow(ProblemState.slug, ProblemState.metadata);

  // 7. Initialize AI Mentor workflow
  initAIChatWorkflow(ProblemState.slug, ProblemState.metadata, ProblemState.activeLanguage);

  // 8. Sync footer details
  getStorageData(["lastSyncedTime"], (data) => {
    renderFooter(data.lastSyncedTime || Date.now(), isBackendConnected);
  });
}

async function processProblem(slug) {
  activeRequestSlug = slug;
  showState("loading");

  const isBackendConnected = await checkBackendHealth();

  // Cancel any ongoing metadata requests
  if (currentAbortController) {
    currentAbortController.abort();
  }
  currentAbortController = new AbortController();
  const signal = currentAbortController.signal;

  // Storage key templates
  const timerKey = `problemTimer_${slug}`;
  const solvedKey = `solved_${slug}`;
  const failureKey = `failure_status_${slug}`;
  const cacheKey = `active_problem_metadata_${slug}`;
  const scrapedKey = `active_problem_scraped_${slug}`;

  // Atomic storage read for cached and computed states
  getStorageData([timerKey, solvedKey, failureKey, cacheKey, scrapedKey, "completedProblems"], async (data) => {
    // Prevent state overwrite if user navigated away during storage query
    if (activeRequestSlug !== slug) return;

    // Unpack solved status
    let solved = data[solvedKey] === true;
    if (!solved && data.completedProblems) {
      solved = data.completedProblems.includes(slug);
    }

    // Unpack timer
    let timer = data[timerKey];
    if (solved) {
      if (!timer) {
        timer = { startTime: Date.now(), endTime: Date.now(), duration: 0, solved: true };
      } else if (!timer.solved) {
        timer.solved = true;
        timer.endTime = Date.now();
        timer.duration = Math.max(0, Math.floor((timer.endTime - timer.startTime) / 1000));
        setStorageData({ [timerKey]: timer });
      }
    }

    const failureStatus = data[failureKey];

    // Check cached metadata (TTL = 24 Hours)
    let cachedMetadata = null;
    const cacheEntry = data[cacheKey];
    if (cacheEntry && cacheEntry.timestamp && Date.now() - cacheEntry.timestamp < 24 * 60 * 60 * 1000) {
      cachedMetadata = cacheEntry.data;
    }

    // Unpack scraped details from content script
    const scrapedEntry = data[scrapedKey] || {};
    const scrapedTitle = scrapedEntry.title || formatSlugToTitle(slug);
    const scrapedTags = scrapedEntry.tags || [];

    // Unify state with local parameters immediately (prevents UI flicker)
    ProblemState.slug = slug;
    ProblemState.solved = solved;
    ProblemState.timer = timer;
    ProblemState.failureStatus = failureStatus;
    
    detectEditorLanguage(async (lang) => {
      if (activeRequestSlug !== slug) return;
      ProblemState.activeLanguage = lang;

      if (cachedMetadata) {
        ProblemState.metadata = cachedMetadata;
        syncUI(isBackendConnected);

        // Background update check: if cached metadata is NOT official, check if official is available now
        if (isBackendConnected && cachedMetadata.source !== "official") {
          console.log(`Popup: Cached metadata for ${slug} is non-official (${cachedMetadata.source}). Checking for updates...`);
          const urlParams = new URLSearchParams();
          urlParams.append("title", scrapedTitle);
          if (scrapedTags.length > 0) urlParams.append("tags", scrapedTags.join(","));
          
          try {
            const res = await fetch(`http://localhost:5000/api/problems/${encodeURIComponent(slug)}?${urlParams.toString()}`, { signal });
            if (res.ok) {
              const freshData = await res.json();
              if (freshData && freshData.source === "official") {
                console.log(`Popup: Found official metadata update for ${slug}. Overwriting cache.`);
                setStorageData({ [cacheKey]: { timestamp: Date.now(), data: freshData } });
                if (activeRequestSlug === slug) {
                  ProblemState.metadata = freshData;
                  syncUI(isBackendConnected);
                }
              }
            }
          } catch (e) {
            // ignore background error
          }
        }
      } else {
        // Fetch from backend
        let problemData = null;
        if (isBackendConnected) {
          const urlParams = new URLSearchParams();
          urlParams.append("title", scrapedTitle);
          if (scrapedTags.length > 0) urlParams.append("tags", scrapedTags.join(","));
          
          try {
            const res = await fetch(`http://localhost:5000/api/problems/${encodeURIComponent(slug)}?${urlParams.toString()}`, { signal });
            if (res.ok) {
              problemData = await res.json();
            }
          } catch (e) {
            console.error("Popup: Backend fetch failed:", e);
          }
        }

        if (problemData) {
          // Write to local cache with timestamp
          setStorageData({ [cacheKey]: { timestamp: Date.now(), data: problemData } });
        } else {
          // Fall back to offline database problems.js
          if (typeof problems !== "undefined" && problems[slug]) {
            problemData = { ...problems[slug], source: "official" }; // offline database contains official curated problem data
            console.log("Popup: Loaded problem from offline database:", slug);
            setStorageData({ [cacheKey]: { timestamp: Date.now(), data: problemData } });
          } else {
            // Fall back to local heuristic classifier
            const { classifyProblemLocally } = await import("./utils/classifier.js");
            problemData = classifyProblemLocally(slug, scrapedTitle, scrapedTags.join(","));
            console.log("Popup: Loaded problem from local heuristic classifier:", slug, problemData);
            // Cache locally
            setStorageData({ [cacheKey]: { timestamp: Date.now(), data: problemData } });
          }
        }

        if (activeRequestSlug === slug) {
          ProblemState.metadata = problemData;
          syncUI(isBackendConnected);
        }
      }
    });
  });
}

function initStuckWorkflow(slug, problem) {
  const primaryActionArea = document.getElementById("primaryActionArea");
  const stuckBtn = document.getElementById("stuckBtn");
  const stuckMenu = document.getElementById("stuckMenu");
  const stuckMenuBack = document.getElementById("stuckMenuBack");
  const guidancePanel = document.getElementById("guidancePanel");
  const guidanceHeader = document.getElementById("guidanceHeader");
  const guidanceContent = document.getElementById("guidanceContent");
  const guidanceBack = document.getElementById("guidanceBack");

  if (!stuckBtn || !stuckMenu || !guidancePanel) return;

  // Unbind any previous dynamic events
  stuckBtn.onclick = null;
  stuckMenuBack.onclick = null;
  guidanceBack.onclick = null;

  stuckBtn.onclick = () => {
    primaryActionArea.classList.add("hidden");
    stuckMenu.classList.remove("hidden");
  };

  stuckMenuBack.onclick = () => {
    stuckMenu.classList.add("hidden");
    primaryActionArea.classList.remove("hidden");
  };

  guidanceBack.onclick = () => {
    guidancePanel.classList.add("hidden");
    stuckMenu.classList.remove("hidden");
  };

  const menuButtons = stuckMenu.querySelectorAll(".menu-btn");
  menuButtons.forEach(btn => {
    btn.onclick = null; // Unbind previous
    btn.onclick = () => {
      const type = btn.getAttribute("data-type");
      stuckMenu.classList.add("hidden");
      guidancePanel.classList.remove("hidden");

      if (type === "pattern") {
        if (guidanceHeader) guidanceHeader.textContent = "PATTERN GUIDANCE";
        renderPatternGuidance(problem, slug, guidanceContent);
      } else if (type === "complexity") {
        if (guidanceHeader) guidanceHeader.textContent = "COMPLEXITY CEILING";
        renderComplexityGuidance(problem, slug, guidanceContent);
      } else if (type === "logic") {
        if (guidanceHeader) guidanceHeader.textContent = "LOGICAL CLUES";
        renderLogicGuidance(problem, slug, guidanceContent);
      } else if (type === "edgecases") {
        if (guidanceHeader) guidanceHeader.textContent = "FAILURE GUARDS";
        renderEdgeCasesGuidance(problem, slug, guidanceContent);
      }
    };
  });
}

function initAIChatWorkflow(slug, problem, language) {
  const askBtn = document.getElementById("askBtn");
  const activeState = document.getElementById("activeState");
  const chatState = document.getElementById("chatState");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatContextText = document.getElementById("chatContextText");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  if (!askBtn || !chatState || !chatCloseBtn) return;

  // Unbind any previous events
  askBtn.onclick = null;
  chatCloseBtn.onclick = null;
  chatForm.onsubmit = null;

  askBtn.onclick = () => {
    activeState.classList.add("hidden");
    chatState.classList.remove("hidden");
    
    if (chatContextText) {
      chatContextText.textContent = `${problem.title} (${language})`;
    }
  };

  chatCloseBtn.onclick = () => {
    chatState.classList.add("hidden");
    activeState.classList.remove("hidden");
  };

  chatForm.onsubmit = (e) => {
    e.preventDefault();
    const promptText = chatInput.value.trim();
    if (!promptText) return;

    // Render User Query
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.textContent = promptText;
    chatMessages.appendChild(userMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    chatInput.value = "";

    // Render Loading Element
    const mentorMsg = document.createElement("div");
    mentorMsg.className = "chat-message mentor";
    mentorMsg.innerHTML = `<span style="font-style: italic; color: var(--text-muted);">Mentor is thinking...</span>`;
    chatMessages.appendChild(mentorMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Build Context Prompt strictly using active ProblemState properties
    const contextPrompt = `[Context: Solving "${problem.title}" in "${language}" under Topic "${problem.topic || "DSA"}${problem.pattern ? " - " + problem.pattern : ""}". Act as a senior DSA mentor giving step-by-step guidance without spoiled code.] User asks: ${promptText}`;

    fetch("http://localhost:5000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: contextPrompt })
    })
    .then(res => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then(data => {
      mentorMsg.textContent = data.reply || "No response received.";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(() => {
      mentorMsg.className = "chat-message error";
      mentorMsg.textContent = "AI Mentor is currently offline or API key is missing. For direct logic debugging, please use the guided options under Logic and Edge Cases!";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  };
}

function initialize() {
  showState("loading");

  syncAuthToken(() => {
    if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab && activeTab.url) {
          try {
            const url = new URL(activeTab.url);
            if (isLeetCodeUrl(activeTab.url)) {
              const slug = extractProblemSlugFromPathname(url.pathname);
              if (slug) {
                processProblem(slug);
                setStorageData({ problemSlug: slug });
                return;
              }
            }
          } catch (e) {
            console.error("Popup URL parsing logic error:", e);
          }
        }
        loadFallbackStorage();
      });
    } else {
      loadFallbackStorage();
    }
  });
}

function loadFallbackStorage() {
  getStorageData(["problemSlug"], async (data) => {
    const isBackendConnected = await checkBackendHealth();
    if (data && data.problemSlug) {
      await processProblem(data.problemSlug);
    } else {
      showState("empty");
      renderFooter(null, isBackendConnected);
    }
  });
}

// Watch for active tab updates (SPA navigation support)
if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.onUpdated) {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id === tabId) {
          try {
            const url = new URL(changeInfo.url);
            if (isLeetCodeUrl(changeInfo.url)) {
              const slug = extractProblemSlugFromPathname(url.pathname);
              if (slug && slug !== ProblemState.slug) {
                console.log("Popup: Tab updated navigation to new slug ->", slug);
                processProblem(slug);
              }
            }
          } catch (e) {
            console.error("Popup URL change exception:", e);
          }
        }
      });
    }
  });
}

// Watch for tab selection transitions (tab switches)
if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.onActivated) {
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab && tab.url && isLeetCodeUrl(tab.url)) {
        try {
          const url = new URL(tab.url);
          const slug = extractProblemSlugFromPathname(url.pathname);
          if (slug && slug !== ProblemState.slug) {
            console.log("Popup: Active tab switched to new slug ->", slug);
            processProblem(slug);
          }
        } catch (e) {
          console.error("Popup tab activated exception:", e);
        }
      }
    });
  });
}

// Watch for storage changes to synchronize solved state and timer in real-time
if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && ProblemState.slug) {
      const solvedKey = `solved_${ProblemState.slug}`;
      const timerKey = `problemTimer_${ProblemState.slug}`;
      if (changes[solvedKey] || changes[timerKey] || changes.completedProblems) {
        console.log("Popup: Storage changed, refreshing UI for", ProblemState.slug);
        processProblem(ProblemState.slug);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", initialize);

