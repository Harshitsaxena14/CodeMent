// webContent.js - CodeMent helper running on http://localhost:5173 to bridge authentication and trigger updates

(() => {
  if (window.location.port === "8080" || window.location.pathname.includes("/problems/")) {
    console.log("CodeMent webContent: Skipping sync on problem page.");
    return;
  }

  function syncToken() {
    const token = localStorage.getItem("token");
    const guestMode = localStorage.getItem("guestMode");
    const user = localStorage.getItem("user");

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["token", "completedProblems"], (data) => {
        // If user just logged in (transitioned from no token -> valid token), merge guest progress
        const oldToken = data.token;
        if (newTokenExists(token) && !newTokenExists(oldToken)) {
          console.log("CodeMent: User login detected. Merging guest progress...");
          const guestProblems = data.completedProblems || [];
          if (guestProblems.length > 0) {
            guestProblems.forEach((slug) => {
              fetch("http://localhost:5000/api/progress/track", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                  slug,
                  title: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
                  topic: "General DSA",
                  difficulty: "Medium",
                  status: "solved",
                  timeSpent: 0
                })
              })
              .then(res => {
                if (res.ok) {
                  console.log(`CodeMent: Merged guest problem "${slug}" to account.`);
                  chrome.storage.local.get(["completedProblems"], (store) => {
                    const updated = (store.completedProblems || []).filter(item => item !== slug);
                    chrome.storage.local.set({ completedProblems: updated });
                  });
                }
              })
              .catch(err => console.error("CodeMent Guest Merge Error:", err));
            });
          }
        }

        chrome.storage.local.set({ token, guestMode, user });
      });
    }
  }

  function newTokenExists(t) {
    return t && t !== "null" && t !== "undefined";
  }

  // Initial sync
  syncToken();

  // Monitor storage events & periodic intervals
  window.addEventListener("storage", syncToken);
  setInterval(syncToken, 2000);

  // Watch for storage changes from extension and sync them to website localStorage
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === "local") {
        localStorage.setItem("codement_sync_trigger", String(Date.now()));
      }
    });
  }
})();
