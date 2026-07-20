// CodeMent Extension - Render Utilities Module

const loaderState = document.getElementById("loaderState");
const activeState = document.getElementById("activeState");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");

export function showState(state) {
  if (loaderState) loaderState.classList.add("hidden");
  if (activeState) activeState.classList.add("hidden");
  if (emptyState) emptyState.classList.add("hidden");
  if (errorState) errorState.classList.add("hidden");

  const openBtn = document.getElementById("openBtn");
  const askBtn = document.getElementById("askBtn");
  const revisionBtn = document.getElementById("revisionBtn");

  if (state === "loading") {
    if (loaderState) loaderState.classList.remove("hidden");
    if (openBtn) openBtn.disabled = true;
    if (askBtn) askBtn.disabled = true;
    if (revisionBtn) revisionBtn.disabled = true;
  } else if (state === "active") {
    if (activeState) activeState.classList.remove("hidden");
    if (openBtn) openBtn.disabled = false;
    if (askBtn) askBtn.disabled = false;
    if (revisionBtn) revisionBtn.disabled = false;
  } else if (state === "empty") {
    if (emptyState) emptyState.classList.remove("hidden");
    if (openBtn) openBtn.disabled = true;
    if (askBtn) askBtn.disabled = true;
    if (revisionBtn) revisionBtn.disabled = true;
  } else if (state === "error") {
    if (errorState) errorState.classList.remove("hidden");
    if (openBtn) openBtn.disabled = true;
    if (askBtn) askBtn.disabled = true;
    if (revisionBtn) revisionBtn.disabled = true;
  }
}
