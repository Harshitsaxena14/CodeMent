// CodeMent Extension - Helper Utilities Module

export function formatSlugToTitle(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function extractProblemSlugFromPathname(pathname) {
  if (!pathname) return null;
  const parts = String(pathname).split("/");
  const problemIndex = parts.indexOf("problems");
  if (problemIndex !== -1 && parts[problemIndex + 1]) {
    return parts[problemIndex + 1];
  }
  return null;
}
