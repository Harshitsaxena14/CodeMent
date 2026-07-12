// DOM Elements
const loaderState = document.getElementById("loaderState");
const activeState = document.getElementById("activeState");
const emptyState = document.getElementById("emptyState");

const problemTitle = document.getElementById("problemTitle");
const difficultyBadge = document.getElementById("difficultyBadge");
const topicValue = document.getElementById("topicValue");
const patternValue = document.getElementById("patternValue");

const openBtn = document.getElementById("openBtn");
const askBtn = document.getElementById("askBtn");

let currentProblemSlug = null;
let currentTopicId = null;

// Extractor Helper
function extractProblemSlugFromPathname(pathname) {
  if (!pathname) return null;
  const parts = String(pathname).split("/");
  const problemIndex = parts.indexOf("problems");
  if (problemIndex !== -1 && parts[problemIndex + 1]) {
    return parts[problemIndex + 1];
  }
  return null;
}

// Set up UI views
function showState(state) {
  loaderState.classList.add("hidden");
  activeState.classList.add("hidden");
  emptyState.classList.add("hidden");

  if (state === "loading") {
    loaderState.classList.remove("hidden");
    openBtn.disabled = true;
    askBtn.disabled = true;
  } else if (state === "active") {
    activeState.classList.remove("hidden");
    openBtn.disabled = false;
    askBtn.disabled = false;
  } else if (state === "empty") {
    emptyState.classList.remove("hidden");
    openBtn.disabled = true;
    askBtn.disabled = true;
  }
}

// Fetch problem data from backend
async function fetchProblemFromBackend(slug) {
  try {
    const res = await fetch(`http://localhost:5000/api/problems/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.title) return null;
    return {
      title: data.title,
      difficulty: data.difficulty || "Easy",
      pattern: Array.isArray(data.patterns) ? data.patterns.join(", ") : (data.patterns || "-"),
      topicName: Array.isArray(data.topics) ? data.topics.join(", ") : (data.topics || "-"),
      topicId: data.topicId || null
    };
  } catch (error) {
    return null;
  }
}

// Format difficulty badge style
function formatDifficultyBadge(difficulty) {
  difficultyBadge.innerText = difficulty;
  difficultyBadge.className = "badge"; // Reset

  const diffLower = String(difficulty).toLowerCase();
  if (diffLower === "easy") {
    difficultyBadge.classList.add("easy");
  } else if (diffLower === "medium") {
    difficultyBadge.classList.add("medium");
  } else if (diffLower === "hard") {
    difficultyBadge.classList.add("hard");
  } else {
    difficultyBadge.classList.add("easy");
  }
}

// Process and load problem details
async function processProblem(slug) {
  currentProblemSlug = slug;
  showState("loading");

  // 1. Try Backend fetch
  let problemData = await fetchProblemFromBackend(slug);

  // 2. Try Offline database fallback (problems.js)
  if (!problemData && typeof problems !== "undefined" && problems[slug]) {
    const offlineProb = problems[slug];
    problemData = {
      title: offlineProb.title,
      difficulty: offlineProb.difficulty,
      pattern: offlineProb.pattern || "-",
      topicName: offlineProb.topicName || "Roadmap Node",
      topicId: offlineProb.topicId || null
    };
  }

  // 3. Render State
  if (problemData) {
    problemTitle.innerText = problemData.title;
    formatDifficultyBadge(problemData.difficulty);
    topicValue.innerText = problemData.topicName;
    patternValue.innerText = problemData.pattern;
    currentTopicId = problemData.topicId;

    showState("active");
  } else {
    // Problem unlisted in database, but still extracted
    const formattedTitle = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    problemTitle.innerText = formattedTitle;
    formatDifficultyBadge("Medium");
    topicValue.innerText = "Unassigned Topic";
    patternValue.innerText = "General DSA Pattern";
    currentTopicId = null;

    showState("active");
  }
}

// Main initialization flow
function initialize() {
  showState("loading");

  // Query active tab first (Direct tab checking solves race conditions)
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab && activeTab.url) {
      try {
        const url = new URL(activeTab.url);
        if (url.hostname.includes("leetcode.com")) {
          const slug = extractProblemSlugFromPathname(url.pathname);
          if (slug) {
            processProblem(slug);
            // Save to sync storage
            chrome.storage.local.set({ problemSlug: slug });
            return;
          }
        }
      } catch (e) {
        console.error("Popup URL parsing logic error:", e);
      }
    }

    // Fallback to storage in case tab query isn't LeetCode or tab active check failed
    chrome.storage.local.get(["problemSlug"], (data) => {
      if (data && data.problemSlug) {
        processProblem(data.problemSlug);
      } else {
        showState("empty");
      }
    });
  });
}

// Button Click Event Handlers
if (openBtn) {
  openBtn.onclick = () => {
    if (!currentProblemSlug) return;

    let targetUrl = "http://localhost:5173/roadmap"; // Use standard Vite port 5173
    if (currentTopicId) {
      targetUrl = `http://localhost:5173/roadmap/${currentTopicId}?problem=${encodeURIComponent(currentProblemSlug)}`;
    } else {
      targetUrl = `http://localhost:5173/roadmap?problem=${encodeURIComponent(currentProblemSlug)}`;
    }

    chrome.tabs.create({ url: targetUrl });
  };
}

if (askBtn) {
  askBtn.onclick = () => {
    // Open AI Workspace mentor session
    const aiUrl = "http://localhost:5173/ai";
    chrome.tabs.create({ url: aiUrl });
  };
}

// Start
document.addEventListener("DOMContentLoaded", initialize);
