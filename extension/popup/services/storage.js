// CodeMent Extension - Storage Service Module

export function getStorageData(keys, callback) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(keys, callback);
  } else {
    // Local fallback for dev/testing
    const result = {};
    keys.forEach(k => {
      const val = localStorage.getItem(k);
      try {
        result[k] = val ? JSON.parse(val) : null;
      } catch (e) {
        result[k] = val;
      }
    });
    callback(result);
  }
}

export function setStorageData(data, callback) {
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set(data, callback);
  } else {
    // Local fallback for dev/testing
    Object.keys(data).forEach(k => {
      localStorage.setItem(k, typeof data[k] === "object" ? JSON.stringify(data[k]) : data[k]);
    });
    if (callback) callback();
  }
}
