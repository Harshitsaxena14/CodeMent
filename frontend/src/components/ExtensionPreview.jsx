import { useState } from "react";

function ExtensionPreview() {
  const [activeHint, setActiveHint] = useState(0);

  const hints = [
    {
      title: "Hint 1: Complement Storage",
      desc: "For each element 'x', we need to check if 'target - x' has been seen in the array previously. Can we cache elements as we visit them?"
    },
    {
      title: "Hint 2: HashMap Efficiency",
      desc: "Instead of nested loops searching for the match (O(N^2)), search a HashMap. HashMap hash-lookups resolve complements in O(1) time."
    },
    {
      title: "Hint 3: Space Tradeoff",
      desc: "Using a single pass, insert the value and its index. Check complement existence first, then insert. This avoids matching the element with itself."
    }
  ];

  return (
    <section id="extension" className="relative px-6 py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] radial-glow-indigo opacity-30 pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full">
            Developer Integration
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient mt-6 mb-4">
            LeetCode Extension Integration
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            CodeMent fits right into your workflow. Get context, patterns, and interactive roadmap shortcuts without leaving LeetCode.
          </p>
        </div>

        {/* Browser Mockup */}
        <div className="w-full rounded-2xl border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden bg-zinc-950">
          {/* Chrome Browser Bar */}
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            {/* Window controls */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>

            {/* Browser URL Input */}
            <div className="flex-1 max-w-xl mx-auto flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800/85 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-zinc-400">leetcode.com</span>
                <span className="text-zinc-600">/problems/two-sum</span>
              </div>
              <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.283 8H18" />
              </svg>
            </div>
          </div>

          {/* Browser Workspace Split Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-10 min-h-[500px]">
            {/* Left 7 Columns: Mock LeetCode Page */}
            <div className="lg:col-span-7 p-6 border-r border-zinc-900 bg-zinc-950 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-zinc-100">1. Two Sum</h3>
                  <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                    Easy
                  </span>
                </div>

                <div className="space-y-4 text-sm text-zinc-400 leading-relaxed font-sans">
                  <p>
                    Given an array of integers <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">nums</code> and an integer <code className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-300">target</code>, return <em>indices of the two numbers such that they add up to target</em>.
                  </p>
                  <p>
                    You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.
                  </p>
                </div>

                {/* Example Block */}
                <div className="mt-6 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 font-mono text-xs">
                  <div className="text-zinc-500 mb-1">// Example 1:</div>
                  <div><span className="text-zinc-500">Input:</span> nums = [2,7,11,15], target = 9</div>
                  <div><span className="text-zinc-500">Output:</span> [0,1]</div>
                  <div className="text-zinc-500 mt-1">// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                </div>
              </div>

              {/* Mock LeetCode Editor Button */}
              <div className="mt-8 border-t border-zinc-900 pt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>Auto-saved a few seconds ago</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald"></span> Synced with CodeMent
                </span>
              </div>
            </div>

            {/* Right 3 Columns: CodeMent Sidebar Overlay Extension */}
            <div className="lg:col-span-3 p-6 bg-zinc-900/40 backdrop-blur-md flex flex-col justify-between border-t lg:border-t-0 border-zinc-800">
              <div className="space-y-6">
                {/* Overlay Header */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan"></div>
                    <span className="text-xs font-mono font-bold text-zinc-300">CODEMENT EXTENSION</span>
                  </div>
                  <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>

                {/* Match Detection */}
                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-500 font-mono uppercase tracking-wider">Detected Topic</span>
                    <span className="px-2 py-0.5 rounded bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-mono">
                      Arrays
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-mono uppercase tracking-wider">Target Pattern</span>
                    <span className="px-2 py-0.5 rounded bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo font-mono">
                      Hashing complement
                    </span>
                  </div>
                </div>

                {/* Hints Accordion */}
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Concept Hints</div>
                  <div className="space-y-2">
                    {hints.map((hint, idx) => {
                      const isActive = activeHint === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveHint(idx)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isActive
                              ? "bg-zinc-950 border-zinc-800"
                              : "bg-zinc-900/40 border-transparent hover:bg-zinc-950/20"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                            <span>{hint.title}</span>
                            <svg
                              className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${isActive ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          {isActive && (
                            <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">
                              {hint.desc}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Sync Actions */}
              <div className="mt-8 pt-4 border-t border-zinc-800/80">
                <a
                  href="#pipeline"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-50 font-sans font-bold text-xs hover:bg-zinc-900/60 active:scale-98 transition-all"
                >
                  View Arrays Roadmap Node
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExtensionPreview;
