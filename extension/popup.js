const problemEl = document.getElementById("problem");
const patternEl = document.getElementById("pattern");
const difficultyEl = document.getElementById("difficulty");
const openBtn = document.getElementById("openBtn");

let currentProblemSlug = null;
let currentTopicId = null;

function renderNotAvailable(slug) {
  problemEl.innerText = `Problem detected: ${slug}`;
  patternEl.innerText = "-";
  difficultyEl.innerText = "Not available in CodeMent database yet";
}

async function loadProblemFromBackend(slug) {
  try {
    // Note: backend route expected: GET /api/problems/:slug
    const res = await fetch(`http://localhost:5000/api/problems/${encodeURIComponent(slug)}`);

    // If backend returns 404 or any non-OK response, treat as missing.
    if (!res.ok) return null;

    const data = await res.json();

    // Expected future shape:
    // { title, difficulty, topics, patterns, topicId }
    if (!data || !data.title) return null;

    const patterns = Array.isArray(data.patterns) ? data.patterns : (data.patterns ? [data.patterns] : []);
    const topics = Array.isArray(data.topics) ? data.topics : (data.topics ? [data.topics] : []);

    problemEl.innerText = data.title;
    difficultyEl.innerText = data.difficulty || "-";

    // Display pattern/topic. Prefer patterns; fallback to topics.
    const display = patterns.length ? patterns.join(", ") : (topics.length ? topics.join(", ") : "-");
    patternEl.innerText = display;

    currentTopicId = data.topicId ?? null;
    return data;
  } catch (e) {
    return null;
  }
}

async function sendProgress(){

 const data =
 await chrome.storage.local.get([
  "problem",
  "timeSpent",
  "token"
 ]);

 await fetch(
 "http://localhost:5000/api/progress/track",
 {
  method:"POST",

  headers:{
   "Content-Type":"application/json",
   Authorization:
   `Bearer ${data.token}`
  },

  body:JSON.stringify({

   slug:data.problem,

   status:"attempted",

   timeSpent:data.timeSpent

  })
 }
 );

}
// Get problem slug from storage
chrome.storage.local.get(["problemSlug"], async (data) => {
  const problemSlug = data.problemSlug;
  currentProblemSlug = problemSlug;

  if (!problemSlug) {
    renderNotAvailable("unknown");
    return;
  }

  // Loading state
  problemEl.innerText = "Loading...";
  patternEl.innerText = "Loading...";
  difficultyEl.innerText = "Loading...";

  const result = await loadProblemFromBackend(problemSlug);
  if (!result) {
    renderNotAvailable(problemSlug);
  }
});

// Button click (open CodeMent website)
if (openBtn) {
  openBtn.onclick = () => {
    // Keep original navigation style; but only if we have topicId.
    // If topicId is missing (backend not ready), we still allow opening roadmap generically.
    if (currentTopicId && currentProblemSlug) {
      chrome.tabs.create({
        url:
          "http://localhost:5176/roadmap/" +
          currentTopicId +
          "?problem=" +
          encodeURIComponent(currentProblemSlug)
      });
    } else if (currentProblemSlug) {
      chrome.tabs.create({
        url: "http://localhost:5176/roadmap/?problem=" + encodeURIComponent(currentProblemSlug)
      });
    } else {
      alert("Problem not detected");
    }
  };
}

