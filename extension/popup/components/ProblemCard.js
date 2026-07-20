// CodeMent Extension - ProblemCard & Progressive Coaching Component Module

import { getStorageData, setStorageData } from "../services/storage.js";

export function renderProblemCard(problem, isSolved = false) {
  const titleEl = document.getElementById("problemTitle");
  const topicEl = document.getElementById("topicMapping");
  const stateText = document.getElementById("solvingStateText");
  const stateDot = document.querySelector(".state-dot-active");
  
  if (titleEl) titleEl.textContent = problem.title || "";
  if (topicEl) {
    const topicText = problem.topic || problem.topicName || "General";
    const patternText = problem.pattern && problem.pattern !== "-" ? ` → ${problem.pattern}` : "";
    topicEl.textContent = `Topic: ${topicText}${patternText}`;
  }

  if (stateText && stateDot) {
    if (isSolved) {
      stateText.textContent = "Completed ✓";
      stateText.style.color = "var(--accent-green)";
      stateDot.className = "state-dot-active solved";
    } else {
      stateText.textContent = "In Progress ⏱";
      stateText.style.color = "var(--accent-cyan)";
      stateDot.className = "state-dot-active";
    }
  }
}

// Progressive Coaching Renderer Helper
function renderCoachingFlow(slug, category, container, steps) {
  const storageKey = `revealed_${category}_level_${slug}`;

  getStorageData([storageKey], (data) => {
    let revealedLevel = data[storageKey] !== undefined ? Number(data[storageKey]) : 1;

    // Bound check
    if (revealedLevel > steps.length) revealedLevel = steps.length;
    if (revealedLevel < 1) revealedLevel = 1;

    container.innerHTML = "";

    const flowContainer = document.createElement("div");
    flowContainer.style.display = "flex";
    flowContainer.style.flexDirection = "column";
    flowContainer.style.gap = "6px";
    container.appendChild(flowContainer);

    // 1. Render all revealed steps
    for (let i = 0; i < revealedLevel; i++) {
      const stepBox = document.createElement("div");
      stepBox.style.padding = "5px 7px";
      stepBox.style.background = "rgba(255, 255, 255, 0.01)";
      stepBox.style.borderLeft = "2px solid " + (i === revealedLevel - 1 ? "var(--accent-cyan)" : "var(--border-color)");
      stepBox.style.marginBottom = "2px";

      const stepHeader = document.createElement("div");
      stepHeader.className = "card-subtitle";
      stepHeader.textContent = `STEP ${i + 1}: ${steps[i].title}`;
      
      const stepBody = document.createElement("div");
      stepBody.style.color = "var(--text-secondary)";
      stepBody.style.fontSize = "11px";
      stepBody.style.marginTop = "3px";
      stepBody.innerHTML = steps[i].content;

      stepBox.appendChild(stepHeader);
      stepBox.appendChild(stepBody);
      flowContainer.appendChild(stepBox);
    }

    // 2. Render progressive action button if more clues remain
    if (revealedLevel < steps.length) {
      const triggerBox = document.createElement("div");
      triggerBox.style.marginTop = "4px";

      const triggerBtn = document.createElement("button");
      triggerBtn.className = "hint-trigger";
      triggerBtn.style.border = "1px dashed var(--border-color)";
      triggerBtn.style.padding = "6px";
      triggerBtn.style.borderRadius = "4px";
      triggerBtn.innerHTML = `
        <span>Get Next Clue (Step ${revealedLevel + 1})</span>
        <span style="font-size: 10px;">⚡</span>
      `;

      triggerBtn.onclick = () => {
        const nextLevel = revealedLevel + 1;
        setStorageData({ [storageKey]: nextLevel }, () => {
          renderCoachingFlow(slug, category, container, steps);
        });
      };

      triggerBox.appendChild(triggerBtn);
      flowContainer.appendChild(triggerBox);
    }
  });
}

// 1. Pattern progressive coaching
export function renderPatternGuidance(problem, slug, container) {
  if (problem.unavailable) {
    container.innerHTML = "<div class='text-muted text-xs' style='padding: 10px; text-align: center;'>Information unavailable for this problem.</div>";
    return;
  }
  const patternName = problem.pattern || "General DSA Pattern";
  const logicClue = problem.logic || "Try to analyze if this problem requires indexing elements, calculating intervals, or hash indexing.";

  const steps = [
    {
      title: "Core Observation",
      content: "Observe the array or input structure sizing. Can we solve this in one scan, or do we need to check all combinations?"
    },
    {
      title: "Recognition Signals",
      content: `Keywords should trigger pattern memory. ${logicClue}`
    },
    {
      title: "Why it fits",
      content: `A <strong>${patternName}</strong> pattern fits here because it allows us to store state dynamically as we traverse, eliminating duplicate checks.`
    },
    {
      title: "Pattern Revealed",
      content: `This is a classic <strong>${patternName}</strong> problem. Structure your loops around this traversal strategy.`
    }
  ];

  renderCoachingFlow(slug, "pattern", container, steps);
}

// 2. Complexity progressive coaching
export function renderComplexityGuidance(problem, slug, container) {
  if (problem.unavailable) {
    container.innerHTML = "<div class='text-muted text-xs' style='padding: 10px; text-align: center;'>Information unavailable for this problem.</div>";
    return;
  }
  const timeLimit = problem.complexity?.time || "O(N)";
  const spaceLimit = problem.complexity?.space || "O(1)";

  const steps = [
    {
      title: "Sizing Boundaries",
      content: "Look at the LeetCode constraint limits. What happens if we write a nested O(N^2) loop?"
    },
    {
      title: "Speed Ceiling",
      content: `A suboptimal algorithm will run over operations limit, triggering a Time Limit Exceeded (TLE) error. You need to target a speed ceiling of <strong>${timeLimit}</strong>.`
    },
    {
      title: "Memory Target",
      content: `Can you achieve this target by sacrificing a small amount of extra memory, or is an in-place traversal required?`
    },
    {
      title: "Limits Revealed",
      content: `Aim for: Target Time complexity of <strong>${timeLimit}</strong> and Target Space complexity of <strong>${spaceLimit}</strong>.`
    }
  ];

  renderCoachingFlow(slug, "complexity", container, steps);
}

// 3. Logic progressive coaching
export function renderLogicGuidance(problem, slug, container) {
  if (problem.unavailable) {
    container.innerHTML = "<div class='text-muted text-xs' style='padding: 10px; text-align: center;'>Information unavailable for this problem.</div>";
    return;
  }
  const hints = problem.hints || [];
  
  const steps = [
    {
      title: "First Clue",
      content: hints[0] || "Analyze how variables mutate as you traverse the data structure."
    },
    {
      title: "Coaching Question",
      content: hints[1] || "What pointers, variables, or index trackers are needed to represent your active state?"
    },
    {
      title: "Traversal Clue",
      content: hints[2] || "Think about the update step. How do you shift indices or nodes after evaluating variables?"
    },
    {
      title: "Dry Run Guidance",
      content: "Trace your logical conditions manually with a simple test case before implementing code. Never jump to code immediately."
    }
  ];

  renderCoachingFlow(slug, "logic", container, steps);
}

// 4. Edge Cases progressive coaching
export function renderEdgeCasesGuidance(problem, slug, container) {
  if (problem.unavailable) {
    container.innerHTML = "<div class='text-muted text-xs' style='padding: 10px; text-align: center;'>Information unavailable for this problem.</div>";
    return;
  }
  const pitfalls = problem.mistakes || problem.commonMistakes || [];
  const edgeCases = problem.edgeCases || [];

  const steps = [
    {
      title: "Empty Boundaries",
      content: "Think about the minimal inputs. What happens if the data structure is empty, contains only 1 element, or pointers go out of bounds?"
    },
    {
      title: "Sign & Range Guards",
      content: "Check if negative indices, integer overflow values, or duplicates exist in test cases."
    },
    {
      title: "Common Pitfalls",
      content: pitfalls.length > 0 
        ? `Avoid: <ul>${pitfalls.slice(0, 2).map(p => `<li>${p}</li>`).join("")}</ul>`
        : "Forgetting boundary checks or mutating loop bounds while iterating."
    },
    {
      title: "Edge Cases to Check",
      content: edgeCases.length > 0
        ? `Test inputs: <ul>${edgeCases.slice(0, 2).map(e => `<li><code>${e}</code></li>`).join("")}</ul>`
        : "Null collections, single elements, and target values outside bounds."
    }
  ];

  renderCoachingFlow(slug, "edgecases", container, steps);
}
