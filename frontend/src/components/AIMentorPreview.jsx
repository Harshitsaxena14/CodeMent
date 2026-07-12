import { useState, useEffect } from "react";

function AIMentorPreview() {
  const [stage, setStage] = useState("idle"); // idle, scanning, analyzing, done
  const [progress, setProgress] = useState(0);

  const codeSnippet = `// Two Sum - Inefficient O(N^2) Approach
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`;

  useEffect(() => {
    let interval = null;
    if (stage === "scanning") {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStage("analyzing");
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    } else if (stage === "analyzing") {
      const timer = setTimeout(() => {
        setStage("done");
      }, 1500);
      return () => clearTimeout(timer);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stage]);

  const handleStartAnalysis = () => {
    setStage("scanning");
    setProgress(0);
  };

  const handleReset = () => {
    setStage("idle");
    setProgress(0);
  };

  return (
    <section className="relative px-6 py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-glow-cyan opacity-30 pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-indigo px-3 py-1 bg-accent-indigo/10 border border-accent-indigo/20 rounded-full">
            AI Assistant Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient mt-6 mb-4">
            AI Mentor Code Scanning
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            CodeMent doesn't just give answers. It scans execution parameters, identifies conceptual weak spots, and guides your recovery.
          </p>
        </div>

        {/* Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Panel: The Code Editor */}
          <div className="glass-card rounded-xl border border-zinc-800/80 shadow-2xl flex flex-col overflow-hidden">
            {/* Window chrome header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800/80">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                <span className="text-xs font-mono text-zinc-500 ml-2">twosum.js</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/60">
                JavaScript
              </span>
            </div>

            {/* Code Content */}
            <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-x-auto bg-zinc-950/40">
              <pre className="text-zinc-300">
                {codeSnippet.split("\n").map((line, idx) => (
                  <div key={idx} className="flex group/line">
                    <span className="w-6 text-zinc-600 text-right select-none pr-4">{idx + 1}</span>
                    <span className="flex-1">
                      {line.startsWith("//") ? (
                        <span className="text-zinc-600">{line}</span>
                      ) : line.includes("function") || line.includes("return") || line.includes("for") || line.includes("if") ? (
                        <span className="text-accent-indigo font-semibold">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>

          {/* Right Panel: The AI Mentor Sidecar */}
          <div className="glass-card rounded-xl border border-zinc-800/80 shadow-2xl flex flex-col overflow-hidden bg-zinc-900/30">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
                <span className="text-xs font-mono font-medium text-zinc-300">AI MENTOR SYSTEM</span>
              </div>
              {stage !== "idle" && (
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Content Body */}
            <div className="flex-1 p-6 flex flex-col justify-between min-h-[350px]">
              {stage === "idle" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-accent-cyan mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-sans font-semibold text-zinc-100 mb-2">
                    Start Code Execution Analysis
                  </h3>
                  <p className="text-sm text-zinc-500 max-w-sm mb-6">
                    Click the scan button to execute the AI complexity analysis pipeline on the active snippet.
                  </p>
                  <button
                    onClick={handleStartAnalysis}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-50 text-zinc-950 font-sans font-bold text-sm hover:bg-zinc-200 active:scale-98 transition-all cursor-pointer"
                  >
                    Scan Code Snippet
                  </button>
                </div>
              )}

              {stage === "scanning" && (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4 animate-pulse">
                    Scanning code syntax and complexity loops...
                  </span>
                  <div className="w-full max-w-xs h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-indigo transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 mt-2">{progress}% completed</span>
                </div>
              )}

              {stage === "analyzing" && (
                <div className="flex-1 flex flex-col items-center justify-center py-12">
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-accent-cyan" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider animate-pulse">
                      Analyzing loop structures and map queries...
                    </span>
                  </div>
                </div>
              )}

              {stage === "done" && (
                <div className="flex-1 flex flex-col justify-between gap-6 text-sm">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Time Complexity</div>
                      <div className="text-lg font-mono font-bold text-red-500 mt-1">O(N²)</div>
                      <div className="text-[10px] text-zinc-500 mt-1">Quadratic execution</div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Space Complexity</div>
                      <div className="text-lg font-mono font-bold text-accent-emerald mt-1">O(1)</div>
                      <div className="text-[10px] text-zinc-500 mt-1">Constant space</div>
                    </div>
                  </div>

                  {/* Analysis details */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/80">
                      <span className="font-mono text-zinc-400 text-xs">Weak Topic Detected</span>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono">
                        Nested Searching
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/80">
                      <span className="font-mono text-zinc-400 text-xs">Suggested Pattern</span>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-mono">
                        Two-Pass Hash Map
                      </span>
                    </div>
                  </div>

                  {/* AI Explanation Text */}
                  <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-900 font-sans text-xs leading-relaxed text-zinc-300">
                    <div className="font-mono text-[10px] text-accent-indigo uppercase tracking-widest mb-1.5 font-bold">
                      Mentor Suggestion
                    </div>
                    You are searching matches via nested traversal loops. This results in quadratic O(N²) time. By implementing a Hash Map (O(N) space), you can index targets dynamically and resolve matches in constant O(1) time complexity.
                  </div>

                  {/* Suggested Problems */}
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2.5">
                      Suggested Practice
                    </div>
                    <a
                      href="https://leetcode.com/problems/two-sum/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 hover:text-zinc-50 transition-all group"
                    >
                      <span>1. Two Sum (Optimized)</span>
                      <span className="text-[10px] font-mono text-accent-cyan group-hover:translate-x-1 transition-transform">
                        Launch Problem →
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIMentorPreview;
