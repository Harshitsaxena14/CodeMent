import { useState } from "react";

function Features() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="features" className="relative px-6 py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-glow-indigo opacity-30 pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-indigo px-3 py-1 bg-accent-indigo/10 border border-accent-indigo/20 rounded-full">
            Product Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient mt-6 mb-4">
            Designed for high performance.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Everything you need to systematically build interview confidence, track revision loops, and measure mastery.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Daily Goal & XP System (Spans 2 columns) */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-2 glass-card rounded-2xl p-8 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg min-h-[300px]"
            style={{
              backgroundImage: "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.06), transparent 80%)"
            }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent-indigo/10 to-transparent blur-2xl pointer-events-none"></div>

            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 w-10 h-10 flex items-center justify-center text-accent-indigo mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">Daily Goal & XP Loop</h3>
                <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                  Stay accountable with daily problem challenges. Solve questions, earn experience points (XP), and level up your consistency streak.
                </p>
              </div>

              {/* Progress UI Mockup */}
              <div className="hidden sm:block p-4 rounded-xl bg-zinc-950 border border-zinc-800/60 font-mono text-xs w-60">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-500">TODAY'S GOAL</span>
                  <span className="text-accent-indigo font-bold">2 / 3 Problems</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-accent-indigo w-2/3"></div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-500">XP PROGRESS</span>
                  <span className="text-accent-cyan font-bold">LVL 12</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-cyan w-4/5"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3 text-xs font-mono text-zinc-500">
              <span>🚀 12-Day Streak Active</span>
              <span>•</span>
              <span>🔥 450 XP earned today</span>
            </div>
          </div>

          {/* Card 2: Weak Topic Detection (Square) */}
          <div
            onMouseMove={handleMouseMove}
            className="glass-card rounded-2xl p-8 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg min-h-[300px]"
            style={{
              backgroundImage: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.06), transparent 80%)"
            }}
          >
            <div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 w-10 h-10 flex items-center justify-center text-accent-cyan mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Weak Topic Tracking</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Automatically tags patterns where you exceed typical completion times or submit incorrect compilations on LeetCode.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 rounded">
                Dynamic Programming
              </span>
              <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
                Graph Cycles
              </span>
            </div>
          </div>

          {/* Card 3: AI Code Mentor (Square) */}
          <div
            onMouseMove={handleMouseMove}
            className="glass-card rounded-2xl p-8 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg min-h-[300px]"
            style={{
              backgroundImage: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(99, 102, 241, 0.06), transparent 80%)"
            }}
          >
            <div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 w-10 h-10 flex items-center justify-center text-accent-indigo mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Automated AI Mentor</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Scans algorithm structure for optimizations, tracks code complexity, and delivers guided clues directly into your editor panel.
              </p>
            </div>

            <div className="mt-6 text-xs font-mono text-zinc-500">
              ⚡ Response time: &lt; 2 seconds
            </div>
          </div>

          {/* Card 4: Revision Planner (Spans 2 columns) */}
          <div
            onMouseMove={handleMouseMove}
            className="md:col-span-2 glass-card rounded-2xl p-8 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg min-h-[300px]"
            style={{
              backgroundImage: "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.06), transparent 80%)"
            }}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 w-10 h-10 flex items-center justify-center text-accent-cyan mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-2">Revision Heatmap Planner</h3>
                <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                  CodeMent schedules revisions based on spaced repetition intervals. Never forget a logic structure or an edge-case resolution again.
                </p>
              </div>

              {/* Grid heatmap preview */}
              <div className="hidden sm:grid grid-cols-7 gap-1.5 p-3 rounded-lg bg-zinc-950 border border-zinc-800/60 w-44">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      i % 7 === 1
                        ? "bg-accent-cyan/85 shadow-[0_0_10px_rgba(6,182,212,0.3)] animate-pulse"
                        : i % 5 === 0
                        ? "bg-accent-cyan/40"
                        : i % 3 === 0
                        ? "bg-accent-cyan/10"
                        : "bg-zinc-900"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3 text-xs font-mono text-zinc-500">
              <span>📅 Spaced Repetition active</span>
              <span>•</span>
              <span>🔄 Auto-syncs solved metrics</span>
            </div>
          </div>

          {/* Card 5: Interview Readiness Index */}
          <div
            onMouseMove={handleMouseMove}
            className="glass-card rounded-2xl p-8 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg min-h-[300px]"
            style={{
              backgroundImage: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(16, 185, 129, 0.05), transparent 80%)"
            }}
          >
            <div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 w-10 h-10 flex items-center justify-center text-accent-emerald mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Readiness Index</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A single rating score compiling your correctness rates, execution speed, and topic coverage to estimate your interview readiness.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl font-mono font-bold text-accent-emerald tracking-tight">78%</span>
              <span className="text-xs text-zinc-500 font-mono">ESTIMATED SUCCESS INDEX</span>
            </div>
          </div>

          {/* Card 6: Chrome Extension Sync */}
          <div
            onMouseMove={handleMouseMove}
            className="glass-card rounded-2xl p-8 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden shadow-lg min-h-[300px]"
            style={{
              backgroundImage: "radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.06), transparent 80%)"
            }}
          >
            <div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 w-10 h-10 flex items-center justify-center text-accent-cyan mb-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">Chrome Extension Sync</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Connects directly to your LeetCode layout to scan your code workspace, inject hints, and auto-sync solved items to your roadmap.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
              <span>Browser Extension Connected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;