import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import roadmap from "../data/roadmap";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Standard mock test case traces and step-by-step debugger replays for problems
const problemReplays = {
  "Two Sum": [
    { text: "Initialize loop pointers. Outer index i = 0 (value: 2). Complement lookup target: 9 - 2 = 7.", state: { i: 0, j: "-", currentSum: "-", match: "false", nums: "[2, 7, 11, 15]" } },
    { text: "Inner loop pointer j = 1 (value: 7). Calculate sum = nums[0] + nums[1] = 2 + 7 = 9.", state: { i: 0, j: 1, currentSum: 9, match: "false", nums: "[2, 7, 11, 15]" } },
    { text: "Sum (9) matches target (9). Match detected! Sync indexes [0, 1].", state: { i: 0, j: 1, currentSum: 9, match: "true", nums: "[2, 7, 11, 15]" } },
    { text: "Return indices array [0, 1]. Workspace execution terminated.", state: { i: 0, j: 1, currentSum: 9, match: "true", nums: "[2, 7, 11, 15]" } }
  ],
  "Move Zeroes": [
    { text: "Initialize tracking pointers: read = 0, write = 0. Base array: [0, 1, 0, 3].", state: { read: 0, write: 0, nums: "[0, 1, 0, 3]" } },
    { text: "nums[read] is 0. Element ignored. Increment read pointer to 1.", state: { read: 1, write: 0, nums: "[0, 1, 0, 3]" } },
    { text: "nums[read] is 1 (non-zero). Swap with nums[write] at index 0. Increment write pointer to 1.", state: { read: 1, write: 1, nums: "[1, 0, 0, 3]" } },
    { text: "nums[read] is 0 (index 2). Element ignored. Increment read pointer to 3.", state: { read: 3, write: 1, nums: "[1, 0, 0, 3]" } },
    { text: "nums[read] is 3 (non-zero). Swap with nums[write] at index 1. Increment write pointer to 2. Result array: [1, 3, 0, 0].", state: { read: 3, write: 2, nums: "[1, 3, 0, 0]" } }
  ],
  "Maximum Subarray": [
    { text: "Initialize tracking variables: maxSoFar = nums[0] (-2), currentMax = nums[0] (-2). Begin scan at index 1.", state: { i: 1, currentMax: -2, maxSoFar: -2, nums: "[-2, 1, -3, 4]" } },
    { text: "Index 1 (value: 1). Compare currentMax = max(1, -2 + 1) = 1. Update maxSoFar = max(-2, 1) = 1.", state: { i: 1, currentMax: 1, maxSoFar: 1, nums: "[-2, 1, -3, 4]" } },
    { text: "Index 2 (value: -3). Compare currentMax = max(-3, 1 + -3) = -2. maxSoFar remains 1.", state: { i: 2, currentMax: -2, maxSoFar: 1, nums: "[-2, 1, -3, 4]" } },
    { text: "Index 3 (value: 4). Compare currentMax = max(4, -2 + 4) = 4. Update maxSoFar = max(1, 4) = 4. Scan complete.", state: { i: 3, currentMax: 4, maxSoFar: 4, nums: "[-2, 1, -3, 4]" } }
  ],
  "Valid Anagram": [
    { text: "Verify length parity. length(s) === length(t) === 3. Initialize character code frequency array [26] to 0.", state: { countArray: "[0,0,0,0...]", match: "pending" } },
    { text: "Scan index 0: s['c'] increments index 2 to 1. t['r'] decrements index 17 to -1.", state: { countArray: "[0,0,1,0...-1...]", match: "pending" } },
    { text: "Scan completes. Frequency array elements do not all resolve to 0. Valid anagram returns false.", state: { countArray: "[0,0,1,0...-1...]", match: "false" } }
  ]
};

function TopicDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isGuest, triggerGuestModal } = useAuth();
  const topic = roadmap.find((t) => t.id == id);

  // States
  const [completed, setCompleted] = useState([]);
  const [selectedProb, setSelectedProb] = useState(topic?.questions[0] || null);
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [notepad, setNotepad] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");

  // Execution states
  const [runStage, setRunStage] = useState("idle"); // idle, running, done
  const [activeStep, setActiveStep] = useState(0);

  // Fetch progress from backend
  useEffect(() => {
    const getProgress = async () => {
      if (isGuest) {
        setCompleted([1, 2]); // Demo solved problem IDs
        return;
      }
      try {
        const res = await API.get("/progress");
        if (res.data?.completedProblems) {
          setCompleted(res.data.completedProblems);
        }
      } catch (error) {
        console.log("Practice Workspace: Axios progress error, loading mock state:", error);
      }
    };
    getProgress();
  }, [isGuest]);

  // Load problem context on selection
  useEffect(() => {
    if (selectedProb) {
      if (selectedProb.title === "Two Sum") {
        setCode(`function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`);
      } else if (selectedProb.title === "Move Zeroes") {
        setCode(`function moveZeroes(nums) {\n  let write = 0;\n  for (let read = 0; read < nums.length; read++) {\n    if (nums[read] !== 0) {\n      let temp = nums[write];\n      nums[write] = nums[read];\n      nums[read] = temp;\n      write++;\n    }\n  }\n}`);
      } else if (selectedProb.title === "Maximum Subarray") {
        setCode(`function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currentMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  return maxSoFar;\n}`);
      } else {
        setCode(`function solve(input) {\n  // Write your execution logic here\n  return true;\n}`);
      }

      setNotepad(localStorage.getItem(`note_${selectedProb.title}`) || "");
      setIsBookmarked(localStorage.getItem(`bookmark_${selectedProb.title}`) === "true");
      setRunStage("idle");
      setActiveStep(0);
      setSaveStatus("Saved");
    }
  }, [selectedProb]);

  const getEditorSuggestion = () => {
    if (code.includes("for") && (code.includes("Map") || code.includes("Set"))) {
      return "✨ HashMap detected - optimizing complementary lookup to constant O(1) time.";
    }
    if (code.match(/for.*for/s)) {
      return "⚠️ Nested loops detected - O(N²) quadratic time complexity bottleneck threat.";
    }
    if (code.includes("while") && (code.includes("left") || code.includes("right"))) {
      return "⚡ Two-Pointer / Sliding Window boundaries detected.";
    }
    return "🔍 Code Ment assistant active - scan code with AI for deep diagnostics.";
  };

  const handleSaveNotes = (val) => {
    setNotepad(val);
    setSaveStatus("Saving...");
    if (selectedProb) {
      localStorage.setItem(`note_${selectedProb.title}`, val);
      setTimeout(() => {
        setSaveStatus("Saved");
        if (isGuest) {
          triggerGuestModal();
        }
      }, 550);
    }
  };

  const handleToggleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    if (selectedProb) {
      localStorage.setItem(`bookmark_${selectedProb.title}`, String(newState));
    }
    if (isGuest) {
      triggerGuestModal();
    }
  };

  const handleRunCode = () => {
    setRunStage("running");
    setTimeout(() => {
      setRunStage("done");
      setActiveStep(0);
    }, 1000);
  };

  const handleSubmitCode = async () => {
    if (!selectedProb) return;

    const questionId = selectedProb.id || selectedProb.name;
    const isCompleted = completed.includes(questionId);
    const updated = isCompleted
      ? completed.filter((x) => x !== questionId)
      : [...completed, questionId];

    setCompleted(updated);

    if (isGuest) {
      localStorage.setItem("guestCompletedProblems", JSON.stringify(updated));
      triggerGuestModal();
      return;
    }

    try {
      await API.post("/progress", {
        completedProblems: updated
      });
    } catch (error) {
      console.log("Practice Workspace: Sync progress error:", error);
    }
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center items-center font-mono">
        Topic not found.
      </div>
    );
  }

  const replaySteps = problemReplays[selectedProb?.title] || [];
  const currentStep = replaySteps[activeStep] || null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="noise-bg h-screen bg-zinc-950 text-zinc-100 font-sans flex overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Left Panel - Problem Navigator */}
      <aside className="w-60 border-r border-zinc-800/80 bg-zinc-950/40 p-5 flex flex-col justify-between hidden md:flex flex-shrink-0 z-10">
        <div className="space-y-6">
          <div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Topic Workspace</div>
            <h2 className="text-xl font-bold text-zinc-50 mt-1 tracking-tight">{topic.title}</h2>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                <span>PROGRESS</span>
                <span className="text-zinc-300 font-semibold">
                  {completed.filter(id => topic.questions.some(q => q.id === id || q.name === id)).length} / {topic.questions.length} Solved
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent-cyan"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      (completed.filter(id => topic.questions.some(q => q.id === id || q.name === id)).length /
                        topic.questions.length) *
                      100
                    }%`
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <hr className="border-zinc-900" />

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">problems</span>
            {topic.questions.map((q) => {
              const isSelected = selectedProb?.title === q.title;
              const isCompleted = completed.includes(q.id) || completed.includes(q.title);

              return (
                <button
                  key={q.id}
                  onClick={() => setSelectedProb(q)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/40 ${
                    isSelected
                      ? "bg-zinc-900 border border-zinc-800 text-zinc-50 shadow-md"
                      : "text-zinc-400 hover:bg-zinc-900/20 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isCompleted ? (
                      <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                    )}
                    <span className="truncate">{q.title}</span>
                  </div>
                  <span className={`text-[9px] font-mono ${
                    q.difficulty === "Easy" ? "text-accent-emerald" : "text-amber-500"
                  }`}>
                    {q.difficulty}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => navigate("/roadmap")}
          className="w-full py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-50 text-zinc-300 font-sans text-xs font-bold transition-all active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/35"
        >
          ← Return to Skill Graph
        </button>
      </aside>

      {/* Center Panels Workspace */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden relative z-10 border-r border-zinc-900">
        <div className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6">
          {selectedProb && (
            <div className="glass-card rounded-xl p-5 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-zinc-100">{selectedProb.title}</h3>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                  selectedProb.difficulty === "Easy" ? "bg-accent-emerald/10 text-accent-emerald" : "bg-amber-500/10 text-amber-500"
                }`}>
                  {selectedProb.difficulty}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850">
                  {selectedProb.pattern || "DSA Pattern"}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{selectedProb.statement || "Problem statement details..."}</p>
              
              <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                <span>CONSTRAINTS:</span>
                <span>nums.length &lt;= 10⁴</span>
                <span>target &lt;= 10⁹</span>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl min-h-[300px]">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800/80 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                <span className="text-xs font-mono text-zinc-500 ml-2">solution.js</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500">ENV:</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none"
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                </select>
              </div>
            </div>

            <div className="flex-1 flex">
              <div className="w-10 bg-zinc-900/60 border-r border-zinc-900 py-4 flex flex-col items-center text-[10px] font-mono text-zinc-650 leading-6 select-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-4 bg-transparent outline-none border-none font-mono text-xs leading-6 text-zinc-200 resize-none font-medium focus:ring-0"
                style={{ tabSize: 2 }}
                aria-label="Code Editor Input Area"
              />
            </div>

            <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-900/20 flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none">
              <span className="transition-all duration-300 text-zinc-455">{getEditorSuggestion()}</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span> Copilot Assistant Active
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900 pt-4">
            <div className="flex items-center gap-2">
              <Link
                to="/ai"
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 font-sans font-semibold text-xs transition-all active:scale-[0.98] text-zinc-300 focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
              >
                Analyze with AI
              </Link>
              <Link
                to="/ai"
                className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 font-sans font-semibold text-xs transition-all active:scale-[0.98] text-zinc-300 focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
              >
                Ask Mentor
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                className="px-5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-750 text-zinc-200 font-sans font-semibold text-xs transition-all cursor-pointer active:scale-95 focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
              >
                {runStage === "running" ? "Running..." : "Run Code"}
              </button>
              <button
                onClick={handleSubmitCode}
                className="px-5 py-2 rounded-lg bg-zinc-50 text-zinc-950 font-sans font-bold text-xs hover:bg-zinc-200 transition-all cursor-pointer active:scale-95 shadow-md focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
              >
                {selectedProb && completed.includes(selectedProb.id || selectedProb.title) ? "Solved ✓" : "Submit Solution"}
              </button>
            </div>
          </div>

          {/* Bottom Panel Debugger */}
          <AnimatePresence>
            {runStage === "done" && replaySteps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="glass-card rounded-xl p-5 border border-accent-cyan/35 shadow-[0_0_20px_rgba(6,182,212,0.05)] space-y-4"
              >
                <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse"></span>
                    <span className="text-xs font-mono font-bold text-zinc-300">Execution Replay Debugger</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                    <span>TIME: 48ms</span>
                    <span>•</span>
                    <span>MEMORY: 41.2 MB</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-900/60 text-xs leading-relaxed text-zinc-300 min-h-[54px]">
                  <div className="font-mono text-[9px] text-accent-cyan uppercase tracking-wider mb-1.5 font-bold">
                    Step Description
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -3 }}
                      transition={{ duration: 0.15 }}
                    >
                      {currentStep?.text}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Variables States */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  {currentStep &&
                    Object.entries(currentStep.state).map(([key, val]) => (
                      <div key={key} className="p-2 rounded bg-zinc-900 border border-zinc-850/60">
                        <span className="text-zinc-500 text-[10px] uppercase block">{key}</span>
                        <span className="text-zinc-200 mt-1 block font-bold truncate">{String(val)}</span>
                      </div>
                    ))}
                </div>

                <div className="flex items-center justify-between gap-6 pt-2 select-none">
                  <button
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                    className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-40 text-xs font-mono text-zinc-400 cursor-pointer transition-all duration-150 active:scale-95 outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                  >
                    ← Prev Step
                  </button>

                  <input
                    type="range"
                    min="0"
                    max={replaySteps.length - 1}
                    value={activeStep}
                    onChange={(e) => setActiveStep(Number(e.target.value))}
                    className="flex-1 accent-accent-cyan bg-zinc-900 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />

                  <button
                    disabled={activeStep === replaySteps.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(prev + 1, replaySteps.length - 1))}
                    className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 disabled:opacity-40 text-xs font-mono text-zinc-400 cursor-pointer transition-all duration-150 active:scale-95 outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                  >
                    Next Step →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Right Panel */}
      <aside className="w-[300px] border-l border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md p-6 flex flex-col justify-between overflow-y-auto z-10 flex-shrink-0">
        <div className="space-y-6">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Metadata sidecar</div>

          {selectedProb && (
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/60 space-y-3 transition-all hover:border-zinc-700">
              <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
                <span className="text-[10px] font-mono font-bold text-zinc-300">AI TARGET COMPLEXITY</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[9px] block">TIME TARGET</span>
                  <span className="text-zinc-200 font-bold block mt-0.5">
                    {selectedProb.title === "Two Sum" ? "O(N)" : selectedProb.title === "Maximum Subarray" ? "O(N)" : "O(N)"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[9px] block">SPACE TARGET</span>
                  <span className="text-zinc-200 font-bold block mt-0.5">
                    {selectedProb.title === "Two Sum" ? "O(N)" : selectedProb.title === "Maximum Subarray" ? "O(1)" : "O(26)"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>Notepad notes</span>
              <span className={`text-[9px] font-mono transition-all duration-200 ${
                saveStatus === "Saving..." ? "text-accent-cyan animate-pulse font-bold" : "text-accent-emerald font-semibold"
              }`}>
                {saveStatus}
              </span>
            </div>
            <textarea
              value={notepad}
              onChange={(e) => handleSaveNotes(e.target.value)}
              placeholder="Jot down approach thoughts, edge cases, complexity goals..."
              className="w-full min-h-[120px] p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono leading-relaxed outline-none focus:ring-1 focus:ring-accent-cyan/40 focus:border-transparent resize-y transition-all"
              aria-label="Notepad Notes Area"
            />
          </div>

          <button
            onClick={handleToggleBookmark}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-xs font-semibold tracking-tight transition-all active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/40 ${
              isBookmarked
                ? "bg-accent-indigo/10 border-accent-indigo/35 text-accent-indigo shadow-md"
                : "bg-zinc-950 border-zinc-800 text-zinc-450 hover:text-zinc-50 hover:border-zinc-700"
            }`}
          >
            {isBookmarked ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                <span>Bookmarked Problem</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>Bookmark Problem</span>
              </>
            )}
          </button>

          <div className="space-y-2.5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Related problems</span>
            <div className="space-y-2">
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-850 hover:border-zinc-800 text-xs text-zinc-400 hover:text-zinc-50 transition-all group focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
              >
                <span>Contains Duplicate</span>
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-accent-cyan">Launch ↗</span>
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-850 hover:border-zinc-800 text-xs text-zinc-400 hover:text-zinc-50 transition-all group focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
              >
                <span>4Sum</span>
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-accent-cyan">Launch ↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-[9px] font-mono text-zinc-650 flex items-center justify-between select-none">
          <span>Active Session ID: 4FA2</span>
          <span>Synced</span>
        </div>
      </aside>

    </motion.div>
  );
}

export default TopicDetails;
