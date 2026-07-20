// CodeMent Extension - Buttons Component Module

import { getStorageData, setStorageData } from "../services/storage.js";

export function initButtons(problemSlug, topicId) {
  const openBtn = document.getElementById("openBtn");
  const askBtn = document.getElementById("askBtn");
  const revisionBtn = document.getElementById("revisionBtn");

  if (openBtn) {
    if (problemSlug) {
      openBtn.disabled = false;
      openBtn.onclick = () => {
        let targetUrl = "http://localhost:5173/roadmap";
        if (topicId) {
          targetUrl = `http://localhost:5173/roadmap/${topicId}?problem=${encodeURIComponent(problemSlug)}`;
        } else {
          targetUrl = `http://localhost:5173/roadmap?problem=${encodeURIComponent(problemSlug)}`;
        }
        chrome.tabs.create({ url: targetUrl });
      };
    } else {
      openBtn.disabled = true;
    }
  }

  if (askBtn) {
    if (problemSlug) {
      askBtn.disabled = false;
      askBtn.onclick = () => {
        const aiUrl = `http://localhost:5173/ai?problem=${encodeURIComponent(problemSlug)}`;
        chrome.tabs.create({ url: aiUrl });
      };
    } else {
      askBtn.disabled = true;
    }
  }

  if (revisionBtn) {
    if (problemSlug) {
      revisionBtn.disabled = false;
      
      const storageKey = `revision_${problemSlug}`;
      
      // Load current state
      getStorageData([storageKey], (data) => {
        const isMarked = data[storageKey] === true;
        updateRevisionButtonState(revisionBtn, isMarked);
      });

      revisionBtn.onclick = () => {
        getStorageData([storageKey], (data) => {
          const isMarked = !(data[storageKey] === true);
          setStorageData({ [storageKey]: isMarked }, () => {
            updateRevisionButtonState(revisionBtn, isMarked);
          });
        });
      };
    } else {
      revisionBtn.disabled = true;
    }
  }
}

function updateRevisionButtonState(button, isMarked) {
  if (isMarked) {
    button.classList.add("active");
    button.textContent = "Marked for Revision 🌟";
    button.className = "btn btn-danger-outline active";
  } else {
    button.classList.remove("active");
    button.textContent = "Mark for Revision 📌";
    button.className = "btn btn-danger-outline";
  }
}
