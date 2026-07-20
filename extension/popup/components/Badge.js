// CodeMent Extension - Badge Component Module

export function renderDifficultyBadge(difficulty) {
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = difficulty || "Easy";

  const diffLower = String(difficulty || "").toLowerCase();
  if (diffLower === "easy") {
    badge.classList.add("easy");
  } else if (diffLower === "medium") {
    badge.classList.add("medium");
  } else if (diffLower === "hard") {
    badge.classList.add("hard");
  } else {
    badge.classList.add("easy");
  }

  return badge;
}

export function renderPillTag(text) {
  const tag = document.createElement("span");
  tag.className = "pill-tag";
  tag.textContent = text;
  return tag;
}
