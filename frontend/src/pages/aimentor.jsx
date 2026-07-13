import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Structured mock data representing DSA problem templates and analysis states
const problemTemplates = [
  {
    id: "two-sum",
    title: "1. Two Sum",
    difficulty: "Easy",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
    languages: ["JavaScript", "Python", "C++", "Java"],
    code: `// Two Sum - Inefficient brute-force approach\nfunction twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`,
    analysis: {
      timeComplexity: "O(N²)",
      spaceComplexity: "O(1)",
      pattern: "HashMap Complements",
      weakConcepts: ["Memory-Time trade-off optimizations"],
      edgeCases: [
        "Array contains negative duplicate targets",
        "Target complement sits at array bounds"
      ],
      aiConfidence: 94,
      interviewTips: "Always state the brute force O(N^2) solution first. Discuss the space-time trade-off before writing the O(N) HashMap code.",
      rec: "Solve complement hash search index constraints.",
      related: ["Arrays", "Hash Tables"],
      problems: ["Two Sum II", "4Sum"],
      hints: [
        "Instead of searching complements with loops, can we check if target - nums[i] was seen in a single scan?",
        "Store visited elements and their indexes in a Hash Map. Hash table queries execute in constant O(1) time.",
        "Scan the array once. First query if the complement exists in the map. If it does, return indices. Otherwise, insert nums[i] and continue.",
        "Full Explanation: By loading coordinates into a hash table mapping, we transition query search operations from O(N) iterations to O(1) table queries. Total time complexity reduces from quadratic O(N^2) to linear O(N), with space complexity increasing to O(N) to house index elements."
      ]
    }
  },
  {
    id: "valid-anagram",
    title: "242. Valid Anagram",
    difficulty: "Easy",
    statement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word formed by rearranging the letters of a different word.",
    languages: ["JavaScript", "Python", "Java"],
    code: `// Valid Anagram - Sorting Approach\nfunction isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  \n  const sortedS = s.split("").sort().join("");\n  const sortedT = t.split("").sort().join("");\n  \n  return sortedS === sortedT;\n}`,
    analysis: {
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      pattern: "Character Frequency Map",
      weakConcepts: ["Linear-time sorting constraints"],
      edgeCases: [
        "Empty string inputs",
        "Inputs containing Unicode characters beyond ASCII boundaries"
      ],
      aiConfidence: 89,
      interviewTips: "Compare sorting space-time O(N log N) to frequency mapping O(N). Ask the interviewer if character bounds are limited to lowercase English alphabets.",
      rec: "Practice character index bounds mapping.",
      related: ["Hash Tables", "Strings", "Sorting"],
      problems: ["Group Anagrams", "Find All Anagrams in a String"],
      hints: [
        "Sorting strings requires O(N log N) time. Can we achieve O(N) linear time using character frequency counts?",
        "Use a fixed-size integer array of size 26 or a HashMap to record occurrences of characters.",
        "Increment count values for characters in string 's', and decrement for characters in string 't'. If all array values resolve to 0, return true.",
        "Full Explanation: A character frequency map records occurrences in linear time. We iterate through both strings, updating indexes in an integer table. Sorting overhead is bypassed entirely, achieving O(N) time complexity with a maximum space allocation of O(26) or constant O(1) space constraints."
      ]
    }
  },
  {
    id: "max-subarray",
    title: "53. Maximum Subarray",
    difficulty: "Medium",
    statement: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    languages: ["JavaScript", "Python", "C++"],
    code: `// Maximum Subarray - Brute-Force Subarrays\nfunction maxSubArray(nums) {\n  let max = -Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    let current = 0;\n    for (let j = i; j < nums.length; j++) {\n      current += nums[j];\n      max = Math.max(max, current);\n    }\n  }\n  return max;\n}`,
    analysis: {
      timeComplexity: "O(N²)",
      spaceComplexity: "O(1)",
      pattern: "Kadane's Algorithm (Grid DP)",
      weakConcepts: ["Subarray contiguous accumulation state"],
      edgeCases: [
        "Array contains only negative elements (e.g. [-1, -2, -3])",
        "Single element input arrays"
      ],
      aiConfidence: 91,
      interviewTips: "Ensure you handle arrays containing only negative elements correctly (max should not reset to 0 in that scenario). Explain Kadane's subproblem local choice logic.",
      rec: "Solve grid DP contiguous accumulation ranges.",
      related: ["Arrays", "Divide and Conquer", "Dynamic Programming"],
      problems: ["Maximum Product Subarray", "Longest Turbulent Subarray"],
      hints: [
        "Calculating all subarrays requires O(N^2). Can we resolve optimal sub-sum choices in a single linear pass?",
        "At each index 'i', you have a choice: Add nums[i] to the existing accumulated subarray sum, or start a fresh subarray at nums[i].",
        "Maintain two values: 'currentSum' (local optimum at index i) and 'maxSum' (global optimum seen so far). Update dynamically.",
        "Full Explanation: Kadane's algorithm is a dynamic programming approach. At each index, local optimum = max(nums[i], local_optimum + nums[i]). This local check updates the global maximum, resolving the contiguous range maximum in linear O(N) time and O(1) space."
      ]
    }
  }
];

const getMockChatResponse = (actionName, problemId) => {
  if (problemId === "two-sum") {
    switch (actionName) {
      case "Explain Simpler":
        return {
          text: "Think of **Two Sum** like searching for matching socks in a pile.\n\nInstead of picking up one sock and looking through the entire pile one-by-one (Brute Force `O(N²)`), you pick up a sock, calculate what matching sock color you need (`target - current`), and check if it's already sitting in your organized drawer (HashMap). If it is, you've found the pair in a single look!",
          quickActions: ["Give Example", "Compare Solutions"]
        };
      case "Give Example":
        return {
          text: "Here is a step-by-step trace of `nums = [3, 2, 4]`, `target = 6` using the Hash Map:\n\n1.  **Index 0 (val = 3):** Complement needed = `6 - 3 = 3`. Map is empty. Save `3` (index `0`) to map. \n2.  **Index 1 (val = 2):** Complement needed = `6 - 2 = 4`. Map has `3`. Not found. Save `2` (index `1`) to map.\n3.  **Index 2 (val = 4):** Complement needed = `6 - 4 = 2`. Map has `3, 2`. Found complement `2` at index `1`! Return `[1, 2]`.",
          quickActions: ["Show Dry Run", "Compare Solutions"]
        };
      case "Show Dry Run":
        return {
          text: "Here is the dry run execution grid for nested loops on `nums = [2, 7, 11]`, `target = 9`:\n\n| Step | Outer Loop (i) | Inner Loop (j) | nums[i] | nums[j] | Sum | Match? |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| 1 | 0 (val: 2) | 1 (val: 7) | 2 | 7 | 9 | **YES (Return [0, 1])** |",
          quickActions: ["Compare Solutions", "Quiz Me"]
        };
      case "Compare Solutions":
        return {
          text: "Let's compare the brute force nested loops approach against the optimized HashMap mapping:\n\n| Strategy | Time Complexity | Space Complexity | Pros | Cons |\n| :--- | :--- | :--- | :--- | :--- |\n| **Nested Loops** | `O(N²)` | `O(1)` | Easy to implement | Exceeds time limits on large inputs |\n| **Hash Map** | `O(N)` | `O(N)` | Optimal runtime | Requires extra storage memory |\n\nHere is the optimized HashMap implementation in JavaScript:\n```javascript\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n```",
          quickActions: ["Quiz Me", "Explain Simpler"]
        };
      case "Quiz Me":
        return {
          text: "Here is your interview diagnostic question:\n\n*\"If the input array is already sorted, do we still need a Hash Map to achieve O(N) time complexity?\"*\n\n<details class='bg-zinc-950 p-3 rounded-lg border border-zinc-800 mt-2 block cursor-pointer'><summary class='font-semibold text-accent-cyan'>Reveal Mentor Answer</summary><p class='mt-2 text-zinc-300 leading-relaxed'>**No.** If the array is sorted, we can use the **Two-Pointer technique** (one pointer at the start, one at the end) to solve the problem in `O(N)` time and `O(1)` constant space, saving memory!</p></details>",
          quickActions: ["Compare Solutions", "Explain Simpler"]
        };
      default:
        return {
          text: "I can explain the algorithm in simpler terms, show a step-by-step dry run, compare various solutions, or quiz you on this topic. What would you like to explore next?",
          quickActions: ["Explain Simpler", "Show Dry Run", "Compare Solutions", "Quiz Me"]
        };
    }
  } else if (problemId === "valid-anagram") {
    switch (actionName) {
      case "Explain Simpler":
        return {
          text: "Think of an anagram check like checking if two puzzles have the exact same pieces.\n\nWe count the letters in the first word using a grocery list (Frequency Map). Then, we scan the second word and subtract letters from our list. If all our counts return to zero at the end, they are anagrams!",
          quickActions: ["Give Example", "Compare Solutions"]
        };
      case "Give Example":
        return {
          text: "Let's trace `s = 'cat'`, `t = 'rat'`:\n\n*   **Checklist Status:**\n    *   Initialize: `c: 0, a: 0, t: 0, r: 0`\n    *   Read `s` characters: `c: 1, a: 1, t: 1`\n    *   Subtract `t` characters: `c: 1, a: 0, t: 0, r: -1`\n    *   *Result:* Checklist is not all zeros (`c` is 1, `r` is -1). Return `false`.",
          quickActions: ["Compare Solutions"]
        };
      case "Compare Solutions":
        return {
          text: "Here is the comparison for String Anagram validations:\n\n| Strategy | Time Complexity | Space Complexity | Pros | Cons |\n| :--- | :--- | :--- | :--- | :--- |\n| **Sorting** | `O(N log N)` | `O(N)` | Simple code | Slow sort overhead |\n| **Frequency Count** | `O(N)` | `O(1)` (Max 26 indices) | Optimal runtime | Requires extra storage map |\n\nHere is the optimized O(N) array-based solution:\n```javascript\nfunction isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = new Array(26).fill(0);\n  for (let i = 0; i < s.length; i++) {\n    count[s.charCodeAt(i) - 97]++;\n    count[t.charCodeAt(i) - 97]--;\n  }\n  return count.every(val => val === 0);\n}\n```",
          quickActions: ["Quiz Me", "Explain Simpler"]
        };
      case "Quiz Me":
        return {
          text: "Here is your interview diagnostic question:\n\n*\"What is the space complexity if the strings contain Unicode characters (like emojis or multi-byte characters) instead of lowercase English letters?\"*\n\n<details class='bg-zinc-950 p-3 rounded-lg border border-zinc-800 mt-2 block cursor-pointer'><summary class='font-semibold text-accent-cyan'>Reveal Mentor Answer</summary><p class='mt-2 text-zinc-300 leading-relaxed'>If the character set is unbounded (Unicode), a fixed-size `26` integer array will fail. We must use a **Hash Map** dynamically. The space complexity becomes `O(K)` where `K` is the number of unique characters in the strings (worst case `O(N)`).</p></details>",
          quickActions: ["Compare Solutions", "Explain Simpler"]
        };
      default:
        return {
          text: "I can explain the anagram validation in simpler terms, compare sort vs map, or quiz you on character boundaries. What would you like to explore next?",
          quickActions: ["Explain Simpler", "Compare Solutions", "Quiz Me"]
        };
    }
  } else {
    switch (actionName) {
      case "Explain Simpler":
        return {
          text: "Think of **Kadane's Algorithm** like deciding whether to keep a business partnership or start a new business.\n\nAs you scan elements, you track accumulated sums. If your accumulated sum becomes negative, the partnership is dragging you down! You are better off declaring bankruptcy (resetting sum) and starting a new business fresh at the current element.",
          quickActions: ["Give Example", "Compare Solutions"]
        };
      case "Give Example":
        return {
          text: "Let's trace `nums = [-2, 1, -3, 4]`:\n\n*   **Step 1:** Element = `-2`. Current sum = `-2`. Max sum = `-2`.\n*   **Step 2:** Element = `1`. Current sum = `max(1, -2 + 1) = 1` (Baggage discarded!). Max sum = `max(-2, 1) = 1`.\n*   **Step 3:** Element = `-3`. Current sum = `max(-3, 1 - 3) = -2`. Max sum = `1`.\n*   **Step 4:** Element = `4`. Current sum = `max(4, -2 + 4) = 4` (Baggage discarded!). Max sum = `max(1, 4) = 4`.",
          quickActions: ["Compare Solutions"]
        };
      case "Compare Solutions":
        return {
          text: "Subarray maximum contiguous sum comparison:\n\n| Strategy | Time Complexity | Space Complexity | Pros | Cons |\n| :--- | :--- | :--- | :--- | :--- |\n| **Brute Force** | `O(N²)` | `O(1)` | Simple loops | Timed out on large arrays |\n| **Kadane's Algorithm** | `O(N)` | `O(1)` | Optimal execution | Tricky to derive initially |\n\nHere is the Kadane's single-pass solution:\n```javascript\nfunction maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currentMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  return maxSoFar;\n}\n```",
          quickActions: ["Quiz Me", "Explain Simpler"]
        };
      case "Quiz Me":
        return {
          text: "Here is your interview diagnostic question:\n\n*\"How would you modify Kadane's algorithm to return not just the maximum sum, but also the starting and ending indices of the maximum subarray?\"*\n\n<details class='bg-zinc-950 p-3 rounded-lg border border-zinc-800 mt-2 block cursor-pointer'><summary class='font-semibold text-accent-cyan'>Reveal Mentor Answer</summary><p class='mt-2 text-zinc-300 leading-relaxed'>We track the start/end indexes with simple variables. Whenever `currentMax` resets (we start a new subarray), we record the temporary starting index. Whenever we update the global `maxSoFar`, we copy that temporary start index to our global `bestStart` and mark the current index `i` as `bestEnd`!</p></details>",
          quickActions: ["Compare Solutions", "Explain Simpler"]
        };
      default:
        return {
          text: "I can explain Kadane's algorithm in simpler terms, compare layouts, or quiz you on indexing. What would you like to explore next?",
          quickActions: ["Explain Simpler", "Compare Solutions", "Quiz Me"]
        };
    }
  }
};

function AIMentor() {
  const { isGuest, triggerGuestModal } = useAuth();
  const [selectedProb, setSelectedProb] = useState(problemTemplates[0]);
  const [code, setCode] = useState(problemTemplates[0].code);
  const [language, setLanguage] = useState(problemTemplates[0].languages[0]);
  
  const [analysisStage, setAnalysisStage] = useState("idle"); // idle, scanning, done
  const [revealedHintLevel, setRevealedHintLevel] = useState(0); // 0 = none
  const [inspectorTab, setInspectorTab] = useState("analysis"); // analysis, chat

  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  useEffect(() => {
    if (analysisStage === "done") {
      setChatHistory([
        {
          sender: "ai",
          text: `I've analyzed your solution for **${selectedProb.title}**.\n\nI found a few optimization opportunities (Time complexity is currently **${selectedProb.analysis.timeComplexity}**).\n\nAsk me anything about your code, algorithm, complexity, edge cases, or interview strategy.`,
          quickActions: ["Explain Simpler", "Give Example", "Show Dry Run", "Compare Solutions", "Quiz Me"]
        }
      ]);
    } else {
      setChatHistory([]);
    }
  }, [analysisStage, selectedProb]);

  const handleSelectProblem = (prob) => {
    setSelectedProb(prob);
    setCode(prob.code);
    setLanguage(prob.languages[0]);
    setAnalysisStage("idle");
    setRevealedHintLevel(0);
    setInspectorTab("analysis");
  };

  const handleRunAnalysis = async () => {
    setAnalysisStage("scanning");
    setRevealedHintLevel(0);
    
    setTimeout(() => {
      setAnalysisStage("done");
      if (isGuest) {
        triggerGuestModal();
      }
    }, 1200);

    if (isGuest) return;

    try {
      await API.post("/ai", {
        text: `Analyze the complexity of this code:\n${code}`
      });
    } catch (e) {
      console.log("AI Mentor API post connection logs.");
    }
  };

  const handleSendChat = (messageText) => {
    if (!messageText.trim()) return;
    
    const userMessage = { sender: "user", text: messageText };
    setChatHistory((prev) => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    setTimeout(() => {
      const isQuickAction = ["Explain Simpler", "Give Example", "Show Dry Run", "Compare Solutions", "Quiz Me"].includes(messageText);
      const res = getMockChatResponse(isQuickAction ? messageText : "default", selectedProb.id);
      const aiResponse = { sender: "ai", text: res.text, quickActions: res.quickActions };
      setChatHistory((prev) => [...prev, aiResponse]);
      setChatLoading(false);
      
      if (isGuest) {
        triggerGuestModal();
      }
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="noise-bg h-screen bg-zinc-950 text-zinc-100 font-sans flex overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Left Sidebar Panel */}
      <aside className="w-60 border-r border-zinc-800/80 bg-zinc-950/40 p-6 flex flex-col justify-between hidden md:flex flex-shrink-0 z-10">
        <div className="space-y-6">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Active Workspace</div>
          
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-zinc-500 block mb-2">CURATED PROBLEMS</span>
            {problemTemplates.map((prob) => {
              const isSelected = selectedProb.id === prob.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/40 ${
                    isSelected
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-50 shadow-md"
                      : "text-zinc-400 hover:bg-zinc-900/20 border border-transparent"
                  }`}
                >
                  <span className="truncate">{prob.title}</span>
                  <span className={`text-[9px] font-mono ${
                    prob.difficulty === "Easy" ? "text-accent-emerald" : "text-amber-500"
                  }`}>
                    {prob.difficulty}
                  </span>
                </button>
              );
            })}
          </div>

          <hr className="border-zinc-900" />

          <div className="space-y-2 text-xs">
            <span className="text-xs font-mono text-zinc-500 block">AI SESSIONS</span>
            <div className="p-2 rounded bg-zinc-900/30 border border-zinc-900/60 text-zinc-450 truncate hover:text-zinc-200 cursor-pointer transition-all hover:bg-zinc-900/50">
              Complexity loop review
            </div>
            <div className="p-2 rounded bg-zinc-900/30 border border-zinc-900/60 text-zinc-450 truncate hover:text-zinc-200 cursor-pointer transition-all hover:bg-zinc-900/50">
              Recursion call-stack trace
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/30 border border-zinc-850 text-[10px] font-mono text-zinc-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
          <span>Copilot Engine Active</span>
        </div>
      </aside>

      {/* Center Main Code Editor Workspace Panel */}
      <main className="flex-1 flex flex-col justify-between p-6 overflow-hidden relative z-10 border-r border-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-zinc-100">{selectedProb.title}</h2>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                selectedProb.difficulty === "Easy" ? "bg-accent-emerald/10 text-accent-emerald" : "bg-amber-500/10 text-amber-500"
              }`}>
                {selectedProb.difficulty}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mt-1 font-sans">{selectedProb.statement}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500">ENV:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-700"
            >
              {selectedProb.languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 my-6 rounded-xl border border-zinc-800/80 bg-zinc-950 shadow-2xl flex overflow-hidden">
          <div className="w-10 bg-zinc-900 border-r border-zinc-850 py-4 flex flex-col items-center select-none text-[11px] font-mono text-zinc-600 leading-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-transparent outline-none border-none font-mono text-sm leading-6 text-zinc-200 placeholder-zinc-700 resize-none font-medium focus:ring-0"
            style={{ tabSize: 2 }}
          />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-900 pt-4">
          <span className="text-xs text-zinc-500 font-mono">
            {code.split("\n").length} Lines of execution code
          </span>
          <button
            onClick={handleRunAnalysis}
            disabled={analysisStage === "scanning"}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-50 text-zinc-950 font-sans font-bold text-sm hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
          >
            {analysisStage === "scanning" ? (
              <>
                <svg className="animate-spin h-4 w-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Scanning Complexity Loops...</span>
              </>
            ) : (
              <span>Run AI Mentor Analysis</span>
            )}
          </button>
        </div>
      </main>

      {/* Right Inspector Details Sidebar Panel */}
      <aside className="w-96 border-l border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md flex flex-col overflow-hidden z-10 flex-shrink-0">
        <div className="grid grid-cols-2 border-b border-zinc-900 bg-zinc-900/20 text-xs font-mono relative">
          <button
            onClick={() => setInspectorTab("analysis")}
            className={`py-3 text-center transition-all cursor-pointer relative outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
              inspectorTab === "analysis" ? "text-zinc-100 font-bold" : "text-zinc-550 hover:text-zinc-300"
            }`}
          >
            {inspectorTab === "analysis" && (
              <motion.div layoutId="activeAITabIndicator" className="absolute bottom-0 inset-x-0 h-[1.5px] bg-accent-cyan" />
            )}
            Structured Analysis
          </button>
          <button
            onClick={() => setInspectorTab("chat")}
            className={`py-3 text-center transition-all cursor-pointer relative outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
              inspectorTab === "chat" ? "text-zinc-100 font-bold" : "text-zinc-550 hover:text-zinc-300"
            }`}
          >
            {inspectorTab === "chat" && (
              <motion.div layoutId="activeAITabIndicator" className="absolute bottom-0 inset-x-0 h-[1.5px] bg-accent-cyan" />
            )}
            Mentor Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col">
          <AnimatePresence mode="wait">
            {analysisStage === "idle" && (
              /* Thoughtful empty state instead of blank screens */
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-center text-center p-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">AI Code Mentor diagnostics</h4>
                  <p className="text-xs text-zinc-500 font-sans max-w-[260px] mx-auto leading-relaxed">
                    This workspace acts as your private senior interviewer. Write code inside the editor window, select your target environment and run analysis to unlock structural complexity maps, hints, and suggestions.
                  </p>
                </div>
              </motion.div>
            )}

            {analysisStage === "scanning" && (
              /* Shimmer skeletons */
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 p-6 space-y-6 animate-pulse"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-14 rounded-lg bg-zinc-900 border border-zinc-850"></div>
                  <div className="h-14 rounded-lg bg-zinc-900 border border-zinc-850"></div>
                </div>
                <div className="h-12 rounded-lg bg-zinc-900 border border-zinc-850"></div>
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-zinc-900 rounded"></div>
                  <div className="h-16 bg-zinc-900 rounded-lg border border-zinc-850"></div>
                </div>
              </motion.div>
            )}

            {analysisStage === "done" && inspectorTab === "analysis" && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Time Complexity</span>
                    <span className="text-lg font-mono font-bold text-red-500 mt-1 block">
                      {selectedProb.analysis.timeComplexity}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Space Complexity</span>
                    <span className="text-lg font-mono font-bold text-accent-emerald mt-1 block">
                      {selectedProb.analysis.spaceComplexity}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs text-zinc-400">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                    <span>Detected Pattern</span>
                    <span className="px-2 py-0.5 rounded bg-accent-cyan/15 border border-accent-cyan/20 text-accent-cyan font-semibold">
                      {selectedProb.analysis.pattern}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                    <span>AI Diagnostic Sync</span>
                    <span className="px-2 py-0.5 rounded bg-accent-indigo/15 border border-accent-indigo/20 text-accent-indigo font-semibold">
                      CONFIDENCE: {selectedProb.analysis.aiConfidence}%
                    </span>
                  </div>
                </div>

                {selectedProb.analysis.weakConcepts.length > 0 && (
                  <div className="p-3.5 rounded-lg bg-red-500/5 border border-red-500/10 text-xs">
                    <div className="font-mono text-red-400 uppercase tracking-wider mb-2 font-bold">Weak Areas Found</div>
                    <ul className="list-disc pl-4 text-zinc-400 space-y-1">
                      {selectedProb.analysis.weakConcepts.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Edge Cases Detected</span>
                  <div className="space-y-1.5">
                    {selectedProb.analysis.edgeCases.map((edge, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-zinc-900 border border-zinc-850 text-xs text-zinc-400 flex items-start gap-2">
                        <span className="text-accent-indigo mt-0.5">•</span>
                        <span>{edge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Interviewer Tips</span>
                  <p className="text-xs leading-relaxed text-zinc-450 font-sans italic bg-zinc-900/40 p-3 rounded border border-zinc-900">
                    "{selectedProb.analysis.interviewTips}"
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Practice Next</span>
                  <div className="space-y-2">
                    {selectedProb.analysis.problems.map((item, idx) => (
                      <a
                        key={idx}
                        href="https://leetcode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 hover:text-zinc-50 transition-all group focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
                      >
                        <span>{idx + 1}. {item}</span>
                        <span className="text-[9px] font-mono text-accent-cyan group-hover:translate-x-1 transition-transform">
                          Launch ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Progressive Hints */}
                <div className="border-t border-zinc-900 pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Progressive Hints</span>
                    <span className="text-[9px] font-mono text-zinc-500 font-bold">LEVEL: {revealedHintLevel}/4</span>
                  </div>

                  <div className="space-y-3">
                    {selectedProb.analysis.hints.map((hint, idx) => {
                      const isUnlocked = revealedHintLevel > idx;
                      const isNextToUnlock = revealedHintLevel === idx;
                      const isExplanation = idx === 3;

                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border transition-all duration-300 ${
                            isUnlocked
                              ? "bg-zinc-900/50 border-zinc-800/85 text-zinc-300"
                              : isNextToUnlock
                              ? "bg-zinc-950 border-zinc-850 hover:border-zinc-750 text-zinc-400 cursor-pointer"
                              : "bg-zinc-900/20 border-transparent opacity-40 select-none cursor-not-allowed"
                          }`}
                          onClick={() => {
                            if (isNextToUnlock) {
                              setRevealedHintLevel((prev) => prev + 1);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between text-xs font-bold font-mono">
                            <span>{isExplanation ? "Code Resolution" : `Clue ${idx + 1}`}</span>
                            {isUnlocked ? (
                              <span className="text-[9px] font-mono text-accent-emerald">UNLOCKED</span>
                            ) : isNextToUnlock ? (
                              <span className="text-[9px] font-mono text-accent-cyan animate-pulse">UNLOCK CLUE</span>
                            ) : (
                              <span className="text-[9px] font-mono text-zinc-650">LOCKED</span>
                            )}
                          </div>
                          {isUnlocked && (
                            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                              {hint}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {analysisStage === "done" && inspectorTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {chatHistory.map((msg, idx) => {
                    const isAi = msg.sender === "ai";
                    return (
                      <div key={idx} className="space-y-3">
                        <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
                          <div className={`max-w-[85%] p-4 rounded-xl text-xs leading-relaxed border ${
                            isAi
                              ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                              : "bg-accent-cyan/10 border-accent-cyan/20 text-zinc-100"
                          }`}>
                            <div className="font-mono text-[9px] text-zinc-500 mb-1.5 uppercase font-bold">
                              {isAi ? "AI Mentor" : "Active Student"}
                            </div>
                            
                            <div className="whitespace-pre-wrap font-sans space-y-3">
                              {msg.text.split("\n\n").map((paragraph, pIdx) => {
                                if (paragraph.startsWith("```")) {
                                  const codeContent = paragraph.replace(/```[a-z]*/g, "").trim();
                                  return (
                                    <pre key={pIdx} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 font-mono text-[11px] leading-relaxed text-accent-cyan overflow-x-auto my-2">
                                      <code>{codeContent}</code>
                                    </pre>
                                  );
                                }
                                if (paragraph.startsWith("|")) {
                                  const rows = paragraph.split("\n").filter(row => row.trim());
                                  return (
                                    <div key={pIdx} className="overflow-x-auto my-3 rounded-lg border border-zinc-800">
                                      <table className="w-full text-left font-mono text-[10px] bg-zinc-950">
                                        <thead>
                                          <tr className="border-b border-zinc-800 bg-zinc-900/30">
                                            {rows[0].split("|").slice(1, -1).map((cell, cIdx) => (
                                              <th key={cIdx} className="p-2 text-zinc-500 font-bold">{cell.trim()}</th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {rows.slice(2).map((row, rIdx) => (
                                            <tr key={rIdx} className="border-b border-zinc-900/60 last:border-0 hover:bg-zinc-900/20">
                                              {row.split("|").slice(1, -1).map((cell, cIdx) => (
                                                <td key={cIdx} className="p-2 text-zinc-350">{cell.trim()}</td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  );
                                }
                                return <p key={pIdx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/`(.*?)`/g, "<code class='bg-zinc-950 px-1 py-0.5 border border-zinc-800 rounded font-mono text-[11px] text-zinc-100'>$1</code>") }} />;
                              })}
                            </div>
                          </div>
                        </div>

                        {isAi && msg.quickActions && (
                          <div className="flex flex-wrap gap-1.5 pl-2">
                            {msg.quickActions.map((action, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={() => handleSendChat(action)}
                                className="text-[10px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer active:scale-95 focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-center gap-1.5 text-zinc-500 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0s" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-zinc-900 bg-zinc-950/40">
                  <div className="flex items-center gap-2 rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 focus-within:border-zinc-700 focus-within:bg-zinc-900/30 transition-all">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendChat(chatInput);
                      }}
                      placeholder="Ask mentor: 'explain complexity', 'dry run', etc..."
                      className="flex-1 bg-transparent text-xs outline-none border-none placeholder-zinc-750 text-zinc-300"
                    />
                    <button
                      onClick={() => handleSendChat(chatInput)}
                      className="p-1.5 rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:text-accent-cyan text-zinc-400 transition-all cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

    </motion.div>
  );
}

export default AIMentor;
