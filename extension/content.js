// CodeMent: LeetCode problem slug detection (SPA-aware)


function extractProblemSlugFromPathname(pathname) {
  // Example pathname:
  // "/problems/median-of-two-sorted-arrays/description/"
  if (!pathname) return null;

  const parts = String(pathname).split("/");
  const problemIndex = parts.indexOf("problems");

  if (problemIndex !== -1 && parts[problemIndex + 1]) {
    return parts[problemIndex + 1];
  }

  return null;
}

let lastDetectedSlug = null;

function detectAndStoreSlug() {
  const slug = extractProblemSlugFromPathname(window.location.pathname);

  // Avoid noisy writes/logs if slug hasn't changed.
  if (!slug) return;
  if (slug === lastDetectedSlug) return;

  lastDetectedSlug = slug;

  chrome.storage.local.set({
    problemSlug: slug
  });

  console.log("CodeMent detected:", slug);
}

// 1) Run immediately on load.
detectAndStoreSlug();

// 2) Support LeetCode SPA navigation.
// LeetCode often updates DOM + URL via History API without a full reload.
// We'll detect URL changes by observing DOM mutations and re-checking pathname.
const startTime=Date.now();

window.addEventListener("beforeunload",()=>{

 const endTime=Date.now();

 const timeSpent=Math.floor(
  (endTime-startTime)/1000
 );

 chrome.storage.local.set({
  timeSpent:timeSpent
 });

}); 
const observer = new MutationObserver(() => {
  detectAndStoreSlug();
});

observer.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true
});

// Fallback: periodic re-check in case DOM mutations are missed.
setInterval(() => {
  detectAndStoreSlug();
}, 1000);

