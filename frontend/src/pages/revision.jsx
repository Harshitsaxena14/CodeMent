import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";

function Revision() {
  const [completedProblems, setCompletedProblems] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress");
        if (res.data?.completedProblems) {
          setCompletedProblems(res.data.completedProblems);
        }
      } catch (error) {
        console.log("Revision Planner progress error, loading mock state:", error);
      }
    };
    fetchProgress();
  }, []);

  const todaysRevisions = [
    {
      id: "arrays-complement",
      topic: "Arrays & Hashing",
      problem: "Two Sum",
      time: "20 Mins",
      why: "Solved 12 days ago using brute-force nested loops. AI suggests reviewing rolling HashMap complement maps to reduce time to O(N).",
      risk: 84, 
      difficulty: "Easy",
      link: "/roadmap/arrays"
    },
    {
      id: "strings-window",
      topic: "Strings",
      problem: "Longest Substring Without Repeating Characters",
      time: "30 Mins",
      why: "Solved 9 days ago with high hint-dependency (Level 3 clue unlocked). AI recommends a blank-canvas retry.",
      risk: 68,
      difficulty: "Medium",
      link: "/roadmap/strings"
    }
  ];

  const overdueTopics = [
    { name: "Hashing Collision Handling", overdueDays: 4, danger: "High" },
    { name: "BFS Tree traversals", overdueDays: 2, danger: "Medium" }
  ];

  const upcomingQueue = [
    { topic: "Binary Search Rotations", date: "In 2 Days", estTime: "25m" },
    { topic: "Trees LCA Ancestry", date: "In 4 Days", estTime: "40m" }
  ];

  const completedRevisions = [
    { topic: "Kadane's Algorithm", date: "Yesterday", status: "Successful (O(1) Memory)" },
    { topic: "Anagram Verification", date: "3 Days Ago", status: "Optimal (O(26) Table)" }
  ];

  const calendarDays = [
    { day: 1, topic: "", active: false },
    { day: 2, topic: "", active: false },
    { day: 3, topic: "Hashing", active: false, completed: true },
    { day: 4, topic: "", active: false },
    { day: 5, topic: "Anagrams", active: false, completed: true },
    { day: 6, topic: "", active: false },
    { day: 7, topic: "", active: false },
    { day: 8, topic: "Kadane's", active: false, completed: true },
    { day: 9, topic: "", active: false },
    { day: 10, topic: "", active: false },
    { day: 11, topic: "", active: false },
    { day: 12, topic: "Two Sum", active: true, link: "/roadmap/arrays" },
    { day: 13, topic: "Longest Substring", active: true, link: "/roadmap/strings" },
    { day: 14, topic: "", active: false },
    { day: 15, topic: "", active: false },
    { day: 16, topic: "Binary Search", active: false, upcoming: true },
    { day: 17, topic: "", active: false },
    { day: 18, topic: "LCA Trees", active: false, upcoming: true },
    { day: 19, topic: "", active: false },
    { day: 20, topic: "", active: false },
    { day: 21, topic: "Graphs Cycle", active: false, upcoming: true },
    { day: 22, topic: "", active: false },
    { day: 23, topic: "", active: false },
    { day: 24, topic: "", active: false },
    { day: 25, topic: "", active: false },
    { day: 26, topic: "", active: false },
    { day: 27, topic: "", active: false },
    { day: 28, topic: "", active: false }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="noise-bg min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col pt-10 pb-12 px-6 md:px-12 max-w-7xl mx-auto space-y-8 select-none"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Top Header Integration Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="glass-card rounded-2xl p-8 border border-zinc-800/80 relative overflow-hidden group shadow-xl z-10"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-cyan/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <span className="text-[10px] font-mono uppercase bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25 px-2.5 py-0.5 rounded-md font-bold">
              AI Spaced Repetition Engine
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mt-4 mb-2">
              Revision Planner
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed font-sans">
              Spaced repetition decay checks triggered. Today's target directly feeds your active dashboard mission: <strong className="text-zinc-200">Master String Complements</strong>.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-850 w-full lg:w-auto justify-center">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" className="text-zinc-900" strokeWidth="4" stroke="currentColor" fill="transparent" />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  className="text-accent-cyan"
                  strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 28}
                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - 84/100) }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-sm text-zinc-200">
                84%
              </span>
            </div>
            <div>
              <div className="text-[9px] text-zinc-500 font-mono">RETENTION LEVEL</div>
              <div className="text-xs font-bold text-zinc-300 mt-0.5 font-sans">Average Spaced Memory</div>
              <div className="text-[9px] font-mono text-amber-500 mt-1">Decay Warning: Arrays</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Spaced Repetition Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse"></span>
              <span>Today's Spaced Revision tasks</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {todaysRevisions.map((rev) => (
                <motion.div
                  key={rev.id}
                  variants={itemVariants}
                  className="glass-card rounded-xl p-6 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-accent-cyan/5 to-transparent blur-2xl pointer-events-none"></div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-zinc-505 tracking-wider">
                          {rev.topic}
                        </span>
                        <span className="text-[9px] font-mono bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded text-zinc-400">
                          {rev.difficulty}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-zinc-100 mt-2 mb-1">{rev.problem}</h4>
                      <p className="text-xs text-zinc-450 leading-relaxed max-w-xl font-sans">{rev.why}</p>
                    </div>

                    <div className="flex flex-row sm:flex-col items-end gap-3 w-full sm:w-auto flex-shrink-0">
                      <div className="text-right font-mono">
                        <span className="text-[9px] text-zinc-500 block">FORGETTING RISK</span>
                        <span className="text-sm font-bold text-red-500 block mt-0.5">{rev.risk}%</span>
                      </div>

                      <Link
                        to={rev.link}
                        className="px-4 py-2 rounded-lg bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-sans font-bold text-xs transition-all active:scale-95 text-center w-full sm:w-auto focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
                      >
                        Start Revision
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 6. Memory Retention Timeline */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-6">
              Memory Forgetting Curve decay
            </h3>
            
            <div className="h-40 bg-zinc-950 rounded-xl border border-zinc-900/60 p-4 relative overflow-hidden flex flex-col justify-between">
              <svg className="absolute inset-0 w-full h-full text-zinc-900 pointer-events-none">
                <line x1="0" y1="30" x2="100%" y2="30" stroke="#18181b" strokeWidth="1" />
                <line x1="0" y1="70" x2="100%" y2="70" stroke="#18181b" strokeWidth="1" />
                <line x1="0" y1="110" x2="100%" y2="110" stroke="#18181b" strokeWidth="1" />
                
                <path d="M 20,20 Q 150,110 320,115 T 620,120" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
                <path d="M 320,115 C 340,60 380,20 400,20" fill="none" stroke="#10b981" strokeWidth="2" />
                <path d="M 400,20 Q 500,50 620,65" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
              </svg>

              <div className="absolute left-[310px] top-[108px] w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
              <div className="absolute left-[310px] top-[108px] w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="absolute left-[390px] top-[14px] w-2.5 h-2.5 rounded-full bg-accent-emerald"></div>

              <div className="flex justify-between w-full text-[9px] font-mono text-zinc-500 z-10">
                <span>Day 0 (Learned)</span>
                <span>Day 9 (Confidence Decay Threshold)</span>
                <span>Day 14 (Future target)</span>
              </div>

              <div className="text-[10px] text-zinc-400 font-mono z-10 flex items-center justify-between border-t border-zinc-900 pt-2 select-none">
                <span>🔴 Predicted decay curve without review</span>
                <span>🟢 Projected recovery curve post active revision</span>
              </div>
            </div>
          </motion.div>

          {/* 7. Revision Calendar Grid */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-6">
              <h3 className="text-base font-semibold text-zinc-100">Revision Calendar</h3>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
                <span className="w-2.5 h-2.5 rounded bg-accent-emerald/20 border border-accent-emerald/30"></span> Completed
                <span className="w-2.5 h-2.5 rounded bg-accent-cyan/20 border border-accent-cyan/30"></span> Due today
                <span className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-800"></span> Upcoming
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2.5 text-center font-mono">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((h) => (
                <div key={h} className="text-[10px] text-zinc-500 uppercase font-bold py-1">
                  {h}
                </div>
              ))}

              {calendarDays.map((day) => (
                <div
                  key={day.day}
                  className={`h-16 rounded-xl border flex flex-col justify-between p-2 text-xs relative transition-all duration-300 focus-within:ring-1 focus-within:ring-accent-cyan outline-none ${
                    day.active
                      ? "bg-accent-cyan/5 border-accent-cyan/40 hover:border-accent-cyan/80 font-bold"
                      : day.completed
                      ? "bg-accent-emerald/5 border-accent-emerald/20 opacity-70"
                      : day.upcoming
                      ? "bg-zinc-900 border-zinc-850 hover:border-zinc-750"
                      : "bg-zinc-950/20 border-zinc-900/60 opacity-30"
                  }`}
                  tabIndex={day.active || day.upcoming ? 0 : -1}
                  role="gridcell"
                  aria-label={`Calendar day ${day.day}, scheduled review: ${day.topic || "None"}`}
                >
                  <span className="text-[9px] text-zinc-500 font-semibold">{day.day}</span>
                  {day.topic && (
                    <span className={`text-[8px] font-semibold truncate block text-center ${
                      day.active ? "text-accent-cyan" : day.completed ? "text-accent-emerald" : "text-zinc-400"
                    }`}>
                      {day.topic}
                    </span>
                  )}
                  {day.active && day.link && (
                    <Link to={day.link} className="absolute inset-0 cursor-pointer outline-none" tabIndex={-1} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column sidebar */}
        <div className="space-y-8">
          
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Overdue Topics Alert</h3>
            <div className="space-y-3">
              {overdueTopics.map((topic, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-xs">
                  <div>
                    <span className="font-sans font-semibold text-zinc-200 block">{topic.name}</span>
                    <span className="text-[9px] font-mono text-zinc-500 mt-1 block">Overdue by {topic.overdueDays} Days</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold">
                    {topic.danger} RISK
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-4 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-indigo animate-pulse"></span>
              <h3 className="text-base font-semibold text-zinc-100 font-sans">AI Schedulers</h3>
            </div>
            
            <div className="space-y-4 text-xs leading-relaxed text-zinc-450 font-sans">
              <p>
                "You solved <strong className="text-zinc-300 font-semibold">Graphs Cycle Detection</strong> 9 days ago with heavy hint usage. AI predicts retention has dropped. Review today."
              </p>
              <p>
                "Active session traces detect sliding window index boundary omissions. Spaced calendar updated."
              </p>
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-850 font-mono text-[9px] text-accent-indigo font-bold uppercase tracking-wider">
                Google Target impact: +4.2% Readiness
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Quick Revision Quizzes</h3>
            <div className="space-y-3 font-mono text-xs">
              <button className="w-full flex justify-between items-center p-3 rounded bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700 transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan active:scale-98">
                <span>Kadane's Array Logic</span>
                <span className="text-[10px] text-accent-cyan">Start Quiz</span>
              </button>
              <button className="w-full flex justify-between items-center p-3 rounded bg-zinc-900/30 border border-zinc-850 hover:border-zinc-700 transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan active:scale-98">
                <span>Hash collision bounds</span>
                <span className="text-[10px] text-accent-cyan">Start Quiz</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Completed Revisions</h3>
            <div className="space-y-3 font-mono text-xs text-zinc-500">
              {completedRevisions.map((rev, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-zinc-900/35 border border-zinc-900/65">
                  <div className="flex justify-between font-semibold text-zinc-400">
                    <span>{rev.topic}</span>
                    <span>{rev.date}</span>
                  </div>
                  <div className="text-[10px] text-accent-emerald mt-1">{rev.status}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

    </motion.div>
  );
}

export default Revision;
