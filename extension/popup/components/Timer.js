// CodeMent Extension - Timer Component Module

import { setStorageData } from "../services/storage.js";

let timerInterval = null;

export function initTimer(problemSlug, timerElement, timerState) {
  // 1. Immediately clear any running active interval
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (!problemSlug || !timerElement) {
    if (timerElement) timerElement.textContent = "00:00";
    return;
  }

  const formatTime = (elapsedSec) => {
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // 2. If solved, render the frozen duration instantly and DO NOT start interval
  if (timerState && timerState.solved) {
    const dur = timerState.duration || 0;
    timerElement.textContent = formatTime(dur);
    console.log("Timer Component: Rendered frozen solve time:", formatTime(dur));
    return;
  }

  // 3. Otherwise, run dynamic ticking from startTime
  const startTime = timerState ? timerState.startTime : Date.now();
  const storageKey = `problemTimer_${problemSlug}`;

  // If timerState is null, initialize a fresh timer record in storage
  if (!timerState) {
    const initialRecord = {
      startTime: startTime,
      endTime: null,
      duration: 0,
      solved: false
    };
    setStorageData({ [storageKey]: initialRecord });
  }

  const updateDisplay = () => {
    const elapsedMs = Date.now() - startTime;
    const elapsedSec = Math.max(0, Math.floor(elapsedMs / 1000));
    timerElement.textContent = formatTime(elapsedSec);
  };

  updateDisplay();
  timerInterval = setInterval(updateDisplay, 1000);
}
