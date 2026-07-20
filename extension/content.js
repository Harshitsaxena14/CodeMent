// CodeMent: LeetCode problem slug detection & automatic progress sync (SPA-aware)

let lastDetectedSlug = null;
let hasSyncedThisSession = false;
let lastSyncedSubmissionTime = 0;

function extractProblemSlugFromPathname(pathname) {
  if (!pathname) return null;
  const parts = String(pathname).split("/");
  const problemIndex = parts.indexOf("problems");
  if (problemIndex !== -1 && parts[problemIndex + 1]) {
    return parts[problemIndex + 1];
  }
  return null;
}

function extractProblemTags() {
  const tags = [];
  
  // 1. Scan LeetCode tag elements/links
  const tagLinks = Array.from(document.querySelectorAll('a[href*="/tag/"]'));
  tagLinks.forEach(el => {
    const text = el.textContent.trim();
    if (text && !tags.includes(text)) tags.push(text);
  });
  
  // 2. Scan body text for common tags to catch hidden/lazy-loaded references
  const bodyText = document.body.textContent || "";
  const commonTags = [
    "Array", "Hash Table", "Two Pointers", "String", "Binary Search", "Sliding Window", 
    "Tree", "Depth-First Search", "Breadth-First Search", "Graph", "Dynamic Programming", 
    "Sorting", "Greedy", "Backtracking", "Matrix", "Bit Manipulation", "Linked List", 
    "Trie", "Union Find", "Heap", "Intervals"
  ];
  commonTags.forEach(tag => {
    if (bodyText.includes(tag) && !tags.includes(tag)) {
      tags.push(tag);
    }
  });

  return tags;
}

function extractProblemTitle() {
  const titleEl = document.querySelector(".text-title-large, .mr-2.text-label-1, h4");
  if (titleEl) {
    return titleEl.textContent.replace(/^\d+\.\s*/, "").trim();
  }
  // Fallback to page title
  const pageTitle = document.title || "";
  if (pageTitle.includes("- LeetCode")) {
    return pageTitle.replace(" - LeetCode", "").trim();
  }
  return pageTitle;
}

function scrapeAndStoreMetadata(slug) {
  if (!slug) return;
  const scrapedKey = `active_problem_scraped_${slug}`;
  const title = extractProblemTitle();
  const tags = extractProblemTags();

  if (title && title !== "LeetCode" && title !== "problems" && title.length > 0) {
    chrome.storage.local.get([scrapedKey], (data) => {
      const existing = data[scrapedKey];
      // Only set if missing or tags length has changed (lazy-loaded tags caught)
      if (!existing || existing.title !== title || existing.tags.length !== tags.length) {
        chrome.storage.local.set({
          [scrapedKey]: { title, tags, timestamp: Date.now() }
        });
        console.log(`CodeMent content.js: Scraped metadata for ${slug}:`, { title, tags });
      }
    });
  }
}

function detectAndStoreSlug() {
  const slug = extractProblemSlugFromPathname(window.location.pathname);
  if (!slug) return;

  if (slug !== lastDetectedSlug) {
    console.log("CodeMent content.js: New problem detected ->", slug);
    lastDetectedSlug = slug;
    hasSyncedThisSession = false; // Reset sync status for new session
    chrome.storage.local.set({ problemSlug: slug });

    // Initialize Timer if it doesn't already exist for this problem
    const timerKey = `problemTimer_${slug}`;
    const solvedKey = `solved_${slug}`;
    chrome.storage.local.get([timerKey, solvedKey, "completedProblems"], (data) => {
      let isAlreadySolved = data[solvedKey] === true;
      if (!isAlreadySolved && data.completedProblems) {
        isAlreadySolved = data.completedProblems.includes(slug);
      }

      if (!data[timerKey]) {
        const initialTimer = {
          startTime: Date.now(),
          endTime: null,
          duration: 0,
          solved: isAlreadySolved
        };
        chrome.storage.local.set({ [timerKey]: initialTimer });
        console.log("CodeMent content.js: Initialized fresh timer for", slug, initialTimer);
      }
    });

    // Run initial scraping
    setTimeout(() => scrapeAndStoreMetadata(slug), 1000);
  }
}

// Check LeetCode DOM for Accepted submission state
function checkSubmissionState() {
  if (!lastDetectedSlug || hasSyncedThisSession) return;

  // Throttle triggers to prevent duplicate writes within 5 seconds
  if (Date.now() - lastSyncedSubmissionTime < 5000) return;

  // 1. Check data-e2e-locator for submission result
  const locatorEl = document.querySelector('[data-e2e-locator="submission-result"]');
  let isAccepted = false;

  if (locatorEl && locatorEl.textContent.includes("Accepted")) {
    isAccepted = true;
  }

  // 2. Fallback: Search elements with "Accepted" keyword & green status indicator classes
  if (!isAccepted) {
    const successLabels = Array.from(document.querySelectorAll("span, div, h3"))
      .filter(el => {
        if (el.children.length > 0) return false; // leaf element
        const text = el.textContent.trim();
        return text === "Accepted";
      });

    isAccepted = successLabels.some(el => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      return color.includes("rgb(45,") || color.includes("rgb(46,") || color.includes("rgb(16,") || color.includes("rgb(0,") || color.includes("45, 181") || color.includes("46, 181");
    });

    if (!isAccepted && successLabels.length > 0) {
      isAccepted = true;
    }
  }

  if (isAccepted) {
    lastSyncedSubmissionTime = Date.now();
    hasSyncedThisSession = true; // Prevent duplicate requests in this session
    
    // Freeze the timer state in storage
    const timerKey = `problemTimer_${lastDetectedSlug}`;
    chrome.storage.local.get([timerKey], (data) => {
      const existingTimer = data[timerKey] || { startTime: Date.now() };
      
      if (!existingTimer.solved) {
        const endTime = Date.now();
        const duration = Math.max(0, Math.floor((endTime - existingTimer.startTime) / 1000));
        
        const finalTimer = {
          startTime: existingTimer.startTime,
          endTime: endTime,
          duration: duration,
          solved: true
        };
        
        chrome.storage.local.set({ [timerKey]: finalTimer }, () => {
          console.log("CodeMent content.js: Froze timer at", duration, "seconds for", lastDetectedSlug);
          triggerProgressSync(lastDetectedSlug, duration);
        });
      } else {
        triggerProgressSync(lastDetectedSlug, existingTimer.duration);
      }
    });
  }
}

function triggerProgressSync(slug, durationSec) {
  const metadataKey = `active_problem_metadata_${slug}`;
  const solvedKey = `solved_${slug}`;
  
  chrome.storage.local.get(["token", "guestMode", metadataKey], (data) => {
    const token = data.token;
    const isGuest = data.guestMode === "true" || !token;
    const metadata = data[metadataKey] || {
      title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      topic: "General DSA",
      difficulty: "Medium"
    };

    console.log("CodeMent content.js: Syncing solved status for", slug, "Guest:", isGuest, "Duration:", durationSec);

    // Save solved state locally (always do this as local cache)
    chrome.storage.local.set({ [solvedKey]: true });

    if (isGuest) {
      // Sync guest completed problems list
      chrome.storage.local.get(["completedProblems"], (store) => {
        const completed = store.completedProblems || [];
        if (!completed.includes(slug)) {
          completed.push(slug);
          chrome.storage.local.set({ completedProblems: completed });
        }
        console.log("CodeMent content.js: Solved status saved to local guest profile.");
        showSyncToast();
      });
    } else {
      // Authenticated sync: push request to backend API
      fetch("http://localhost:5000/api/progress/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          slug,
          title: metadata.title,
          topic: metadata.topic,
          difficulty: metadata.difficulty,
          status: "solved",
          timeSpent: durationSec
        })
      })
      .then(res => {
        if (res.ok) {
          console.log("CodeMent content.js: Progress successfully updated on backend.");
          chrome.storage.local.set({ jwtExpired: false });
          showSyncToast();
        } else if (res.status === 401) {
          console.error("CodeMent content.js: JWT token expired.");
          chrome.storage.local.set({ jwtExpired: true });
          queueOfflineSync(slug, metadata, durationSec);
        } else {
          console.error("CodeMent content.js: Backend Sync failed. Code:", res.status);
          queueOfflineSync(slug, metadata, durationSec);
        }
      })
      .catch(err => {
        console.error("CodeMent content.js: Network exception (offline):", err);
        queueOfflineSync(slug, metadata, durationSec);
      });
    }
  });
}

// Queue progress locally when offline or server unreachable (preventing duplicates)
function queueOfflineSync(slug, metadata, timeSpentSec) {
  chrome.storage.local.get(["offlineQueue"], (store) => {
    let queue = store.offlineQueue || [];
    const existingIndex = queue.findIndex(item => item.slug === slug);
    const entry = {
      slug,
      title: metadata.title,
      topic: metadata.topic,
      difficulty: metadata.difficulty,
      status: "solved",
      timeSpent: timeSpentSec,
      timestamp: Date.now()
    };
    
    if (existingIndex !== -1) {
      queue[existingIndex] = entry;
      console.log("CodeMent content.js: Updated existing offline queue entry for:", slug);
    } else {
      queue.push(entry);
      console.log("CodeMent content.js: Appended new offline queue entry for:", slug);
    }
    
    chrome.storage.local.set({ offlineQueue: queue });
  });
}

// Try to synchronize the offline queue
function syncOfflineQueue() {
  chrome.storage.local.get(["token", "offlineQueue"], (data) => {
    const token = data.token;
    const queue = data.offlineQueue || [];
    if (!token || queue.length === 0) return;

    console.log(`CodeMent content.js: Attempting to sync ${queue.length} offline progress entries...`);
    
    const item = queue[0];
    fetch("http://localhost:5000/api/progress/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        slug: item.slug,
        title: item.title,
        topic: item.topic,
        difficulty: item.difficulty,
        status: item.status,
        timeSpent: item.timeSpent
      })
    })
    .then(res => {
      if (res.ok) {
        console.log(`CodeMent content.js: Offline progress synced for "${item.slug}"`);
        chrome.storage.local.set({ 
          offlineQueue: queue.slice(1),
          jwtExpired: false 
        });
        showSyncToast();
      } else if (res.status === 401) {
        chrome.storage.local.set({ jwtExpired: true });
      }
    })
    .catch(err => {
      console.log("CodeMent content.js: Backend still unreachable for offline sync:", err.message);
    });
  });
}

// Show premium floating toast in LeetCode page on successful sync
function showSyncToast() {
  if (document.getElementById("codement-sync-toast")) return;

  const toast = document.createElement("div");
  toast.id = "codement-sync-toast";
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="color: #10b981; font-weight: bold; font-size: 16px;">✓</span>
      <div>
        <div style="font-weight: bold; color: #ffffff;">Progress Synced</div>
        <div style="font-size: 10px; color: #a1a1aa; margin-top: 1px;">Saved to CodeMent profile</div>
      </div>
    </div>
  `;
  
  Object.assign(toast.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#18181b",
    color: "#ffffff",
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #27272a",
    fontFamily: "system-ui, -apple-system, sans-serif",
    fontSize: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)",
    zIndex: "999999",
    opacity: "0",
    transform: "translateY(-10px)",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 10);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// 1. Run immediate detection
detectAndStoreSlug();

// 2. Observer DOM mutations to capture SPA page switches and submissions (Throttled with 300ms debounce)
let mutationTimeout = null;
const observer = new MutationObserver(() => {
  if (mutationTimeout) return;
  mutationTimeout = setTimeout(() => {
    detectAndStoreSlug();
    checkSubmissionState();
    mutationTimeout = null;
  }, 300);
});

observer.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true
});

// 3. Periodic fallback interval (ensures state checks never drop & checks offline syncs)
setInterval(() => {
  detectAndStoreSlug();
  checkSubmissionState();
  if (lastDetectedSlug) {
    scrapeAndStoreMetadata(lastDetectedSlug);
  }
}, 1000);

// Periodically try to flush offline queue
setInterval(syncOfflineQueue, 15000);
window.addEventListener("online", syncOfflineQueue);

// Expose extension ID to the DOM for automated CDP QA tests
function exposeExtensionId() {
  if (typeof document !== "undefined") {
    if (document.body) {
      document.body.setAttribute("data-codement-id", chrome.runtime.id);
    } else {
      setTimeout(exposeExtensionId, 100);
    }
  }
}
exposeExtensionId();
