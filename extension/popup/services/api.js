// CodeMent Extension - API Service Module

const BACKEND_URL = "http://localhost:5000/api";

export async function fetchProblemFromBackend(slug, signal) {
  try {
    const res = await fetch(`${BACKEND_URL}/problems/${encodeURIComponent(slug)}`, { signal });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.title) return null;
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("API Service: Fetch aborted for slug:", slug);
    } else {
      console.error("API Service: Fetch error:", error);
    }
    return null;
  }
}

export async function checkBackendHealth() {
  try {
    // If the server connects, it is active. We can do a quick check on /problems/test.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch(`${BACKEND_URL}/problems/two-sum`, { signal: controller.signal });
    clearTimeout(timeoutId);
    return res.status === 200 || res.status === 404;
  } catch (e) {
    return false;
  }
}
