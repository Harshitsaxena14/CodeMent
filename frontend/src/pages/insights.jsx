import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";

// Generate realistic DSA contribution heatmap metrics for the past 18 weeks (126 days)
const generateHeatmapData = () => {
  const data = [];
  const startOffset = 126; 
  const today = new Date();
  
  for (let i = 0; i < startOffset; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() - (startOffset - 1 - i));
    
    const isWeekEnd = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const isProductive = (i % 3 === 0) || (i % 7 === 2) || (isWeekEnd && i % 2 === 0);
    
    const solved = isProductive ? Math.floor((i % 4) * 0.8) + 1 : 0;
    const timeSpent = solved > 0 ? Math.floor(solved * 35 + (i % 25)) : 0; 
    const aiSessions = solved > 0 ? Math.floor(solved * 0.6) + 1 : 0;
    const revision = solved > 0 && (i % 5 === 0) ? 1 : 0;
    
    let intensity = 0;
    if (solved === 1) intensity = 1;
    else if (solved === 2) intensity = 2;
    else if (solved >= 3) intensity = 3;
    if (solved >= 3 && timeSpent > 100) intensity = 4;

    data.push({
      dateString: currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      dayOfWeek: currentDate.getDay(),
      solved,
      timeSpent,
      aiSessions,
      revision,
      intensity
    });
  }
  return data;
};

function Insights() {
  const [heatmapData] = useState(generateHeatmapData());
  const [hoveredCell, setHoveredCell] = useState(null);
  const [readinessScore, setReadinessScore] = useState(78);
  const [targetCompanies] = useState([
    { name: "Google", score: 72, icon: "G" },
    { name: "Amazon", score: 84, icon: "A" },
    { name: "Microsoft", score: 78, icon: "M" },
    { name: "Atlassian", score: 86, icon: "At" },
    { name: "Uber", score: 68, icon: "U" }
  ]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress");
        if (res.data?.completedProblems) {
          const solvedCount = res.data.completedProblems.length;
          const baseReadiness = Math.min(Math.round((solvedCount / 120) * 100) + 40, 95);
          setReadinessScore(baseReadiness);
        }
      } catch (error) {
        console.log("Insights manager: API offline, fallback to readiness 78%:", error);
      }
    };
    fetchProgress();
  }, []);

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 1: return "bg-accent-cyan/25 border border-accent-cyan/30";
      case 2: return "bg-accent-cyan/50 border border-accent-cyan/40";
      case 3: return "bg-accent-cyan/75 border border-accent-cyan/50";
      case 4: return "bg-accent-cyan border border-cyan-300";
      case 0:
      default:
        return "bg-zinc-900 border border-zinc-850/50 hover:bg-zinc-800/40";
    }
  };

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

      {/* Top Hero Section */}
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
              Goals Diagnostic Insights
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mt-4 mb-2">
              Interview Readiness Index
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed font-sans">
              Your preparation status is tracking ahead of average candidates. Focus on resolving the <strong className="text-zinc-200">2 pending weak topics</strong> to unlock Google and Uber target standards.
            </p>
          </div>

          <div className="flex items-center gap-8 flex-shrink-0 w-full lg:w-auto">
            <div className="flex items-center gap-4 bg-zinc-900/40 p-4 rounded-xl border border-zinc-850 w-full justify-center sm:justify-start">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" className="text-zinc-900" strokeWidth="5" stroke="currentColor" fill="transparent" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="34"
                    className="text-accent-cyan"
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 34}
                    initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - readinessScore / 100) }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg text-zinc-100">
                  {readinessScore}%
                </span>
              </div>
              <div>
                <div className="text-xs text-zinc-500 font-mono">CONFIDENCE SCORE</div>
                <div className="text-base font-bold text-zinc-200 mt-0.5 font-sans">Ready for Targets</div>
                <div className="text-[10px] font-mono text-accent-emerald mt-1">+6.4% this week</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900/60 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {targetCompanies.map((company) => (
            <div key={company.name} className="p-3.5 rounded-xl bg-zinc-900/30 border border-zinc-850/60 font-mono">
              <div className="flex justify-between items-center text-[10px] text-zinc-500">
                <span>{company.name}</span>
                <span className="font-semibold text-zinc-400">{company.score}%</span>
              </div>
              <div className="w-full h-1 bg-zinc-900 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className={`h-full ${company.score >= 80 ? "bg-accent-emerald" : "bg-accent-cyan"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${company.score}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main grids */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 glass-card rounded-2xl p-6 border border-zinc-800/80 flex flex-col justify-between shadow-md relative"
        >
          <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4">
            <div>
              <h3 className="text-base font-semibold text-zinc-100">DSA Activity Heatmap</h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">Commitment grid tracing solved problems and revisions completed.</p>
            </div>
            
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-850"></span>
              <span className="w-2.5 h-2.5 rounded bg-accent-cyan/25 border border-accent-cyan/30"></span>
              <span className="w-2.5 h-2.5 rounded bg-accent-cyan/50 border border-accent-cyan/40"></span>
              <span className="w-2.5 h-2.5 rounded bg-accent-cyan/75 border border-accent-cyan/50"></span>
              <span className="w-2.5 h-2.5 rounded bg-accent-cyan border border-cyan-300"></span>
              <span>More</span>
            </div>
          </div>

          <div className="relative overflow-x-auto py-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[620px] max-w-full justify-between">
              {heatmapData.map((cell, idx) => (
                <motion.div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none ${getIntensityColor(
                    cell.intensity
                  )}`}
                  onMouseEnter={() => setHoveredCell(cell)}
                  onMouseLeave={() => setHoveredCell(null)}
                  tabIndex={0}
                  role="gridcell"
                  aria-label={`Activity on ${cell.dateString}: solved ${cell.solved} problems`}
                />
              ))}
            </div>
          </div>

          <div className="h-12 border-t border-zinc-900/60 mt-4 pt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            {hoveredCell ? (
              <>
                <div>
                  DATE: <span className="text-zinc-300 font-semibold">{hoveredCell.dateString}</span>
                </div>
                <div className="flex gap-4">
                  <div>SOLVED: <span className="text-accent-cyan font-bold">{hoveredCell.solved} Qs</span></div>
                  <div>TIME: <span className="text-zinc-300 font-semibold">{hoveredCell.timeSpent} mins</span></div>
                  <div>AI SESSIONS: <span className="text-zinc-300 font-semibold">{hoveredCell.aiSessions}</span></div>
                  <div>REVISED: <span className={hoveredCell.revision ? "text-accent-emerald" : "text-zinc-500"}>
                    {hoveredCell.revision ? "YES" : "NO"}
                  </span></div>
                </div>
              </>
            ) : (
              <span className="italic text-zinc-650 font-sans">Hover over any square on the contribution grid to inspect history logs</span>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
        >
          <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-6">Problems solved</h3>
          <div className="flex items-center justify-around gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" className="text-zinc-900" strokeWidth="6" stroke="currentColor" fill="transparent" />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="text-accent-emerald"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 40}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * 0.25 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  stroke="currentColor"
                  fill="transparent"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  className="text-amber-500"
                  strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 40}
                  initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 40 * 0.70 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-lg font-bold text-zinc-100 animate-pulse">24</span>
                <span className="text-[9px] text-zinc-500">SOLVED</span>
              </div>
            </div>

            <div className="space-y-2.5 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
                <span>Easy: <strong className="text-zinc-200">18 Solved</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Medium: <strong className="text-zinc-200">5 Solved</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Hard: <strong className="text-zinc-200">1 Solved</strong></span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* AI summaries & streaking lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-4 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-indigo opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-indigo"></span>
            </span>
            <h3 className="text-base font-semibold text-zinc-100 font-sans">AI Weekly Insights</h3>
          </div>
          <div className="space-y-4 text-xs leading-relaxed text-zinc-400 font-sans">
            <p>
              Your solve speed in <span className="text-accent-cyan font-bold font-mono">HashMap lookup patterns</span> has increased by 14% since Tuesday. You resolved complements in average 18 minutes.
            </p>
            <p>
              However, tree and graph traversals show high hint-dependency (averaging clue level 3.2). Review active nodes next.
            </p>
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 font-mono text-[10px] text-accent-indigo uppercase tracking-wider font-bold">
              Target topic: Sliding Window
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md">
          <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Learning Velocity</h3>
          <div className="space-y-3.5 font-mono text-xs text-zinc-400">
            <div className="flex justify-between items-center p-2.5 rounded bg-zinc-900/30 border border-zinc-900">
              <span>Average Solve Time</span>
              <span className="text-accent-emerald font-bold">-8 Mins Improvement</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded bg-zinc-900/30 border border-zinc-900">
              <span>Solution Accuracy</span>
              <span className="text-zinc-200 font-semibold">82% Success Rate</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded bg-zinc-900/30 border border-zinc-900">
              <span>Complexity Opt-in</span>
              <span className="text-accent-cyan font-bold">74% Optimized Code</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded bg-zinc-900/30 border border-zinc-900">
              <span>Hint Dependency</span>
              <span className="text-zinc-200 font-semibold">1.2 avg (Decreased)</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Daily Streak</h3>
            <div className="flex items-center justify-around text-center py-2">
              <div>
                <div className="text-3xl font-bold font-mono text-gradient">12</div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">Active Streak</div>
              </div>
              <div className="w-px h-10 bg-zinc-900" />
              <div>
                <div className="text-3xl font-bold font-mono text-zinc-450">24</div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">Longest Streak</div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900/80 pt-3 space-y-2">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Badges Unlocked</span>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-300 font-mono truncate">
                HashMap Expert
              </span>
              <span className="text-[10px] px-2 py-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-300 font-mono truncate">
                Memory Savior
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Growth maps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md">
          <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Skill Growth Map</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
            <div>
              <div className="flex justify-between mb-1.5">
                <span>Arrays & Hashing</span>
                <span className="text-accent-emerald font-bold">100%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div className="h-full bg-accent-emerald" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span>Strings</span>
                <span className="text-accent-cyan font-bold">60%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div className="h-full bg-accent-cyan" initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span>Trees</span>
                <span className="text-accent-cyan font-bold">45%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div className="h-full bg-accent-cyan" initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 0.5 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span>Graphs</span>
                <span className="text-zinc-650">20%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div className="h-full bg-zinc-800" initial={{ width: 0 }} animate={{ width: "20%" }} transition={{ duration: 0.5 }} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Weak Topics Alert</h3>
            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 flex justify-between items-center">
                <span className="font-sans font-semibold text-zinc-300">Dynamic Programming</span>
                <Link to="/roadmap" className="text-[10px] font-mono text-red-400 hover:underline focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none">
                  Review Node →
                </Link>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 flex justify-between items-center">
                <span className="font-sans font-semibold text-zinc-300">Graph Cycles</span>
                <Link to="/roadmap" className="text-[10px] font-mono text-amber-400 hover:underline focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none">
                  Review Node →
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900/80 pt-3 mt-4 text-[10px] font-mono text-zinc-550">
            Goals: Complete Strings Node by tomorrow evening to unlock Dynamic Programming.
          </div>
        </div>
      </div>

    </motion.div>
  );
}

export default Insights;
