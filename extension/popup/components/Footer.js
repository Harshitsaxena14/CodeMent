// CodeMent Extension - Footer Component Module

export function renderFooter(lastSyncedTime, isConnected) {
  const lastSyncedEl = document.getElementById("lastSynced");
  const backendStatusEl = document.getElementById("backendStatus");
  const versionEl = document.getElementById("extensionVersion");
  const statusDot = document.querySelector(".status-dot");

  if (lastSyncedEl) {
    if (lastSyncedTime) {
      const timeStr = new Date(lastSyncedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      lastSyncedEl.textContent = `Last Synced: ${timeStr}`;
    } else {
      lastSyncedEl.textContent = "Last Synced: --:--";
    }
  }

  if (backendStatusEl) {
    if (isConnected) {
      backendStatusEl.textContent = "CONNECTED";
      backendStatusEl.style.color = "var(--accent-cyan)";
    } else {
      backendStatusEl.textContent = "OFFLINE";
      backendStatusEl.style.color = "var(--text-muted)";
    }
  }

  if (statusDot) {
    if (isConnected) {
      statusDot.className = "status-dot active";
    } else {
      statusDot.className = "status-dot";
    }
  }

  if (versionEl) {
    const version = chrome.runtime.getManifest().version;
    versionEl.textContent = `v${version}`;
  }
}
