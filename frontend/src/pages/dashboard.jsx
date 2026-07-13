import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [progress, setProgress] = useState(null);
  const location = useLocation();
  const { isGuest, triggerGuestModal } = useAuth();

  useEffect(() => {
    const loadProgress = async () => {
      if (isGuest) {
        setProgress({
          completedProblems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          streak: 12,
          xp: 450
        });
        return;
      }
      try {
        const res = await API.get("/progress");
        setProgress(res.data);
      } catch (error) {
        console.log("Using mock dashboard data due to backend connection state:", error);
      }
    };
    loadProgress();
  }, [isGuest]);

  const solved = progress?.completedProblems?.length || 24;
  const total = 120;
  const percent = Math.round((solved / total) * 100);

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      )
    },
    {
      name: "Skill Graph",
      path: "/roadmap",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      name: "Practice Workspace",
      path: "/roadmap/arrays",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      name: "AI Mentor",
      path: "/ai",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      name: "Revision Planner",
      path: "/revision",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: "Insights & Goals",
      path: "/insights",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: "Daily Mission",
      path: "/mission",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
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
      transition={{ duration: 0.25 }}
      className="noise-bg min-h-screen bg-zinc-950 text-zinc-100 font-sans p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto space-y-8"
    >
        
        {/* Workspace Greeting Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gradient">Dashboard</h1>
            <p className="text-sm text-zinc-400 mt-1 font-sans">Welcome back. Let's conquer today's coding mission.</p>
          </div>
          
          {/* Sync indicator */}
          <button
            onClick={() => {
              if (isGuest) triggerGuestModal();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:border-zinc-700 transition-all cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            <span>LeetCode synced via Extension</span>
          </button>
        </div>

        {/* Dashboard Grid System */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 xl:grid-cols-3 gap-8"
        >
          
          {/* Left 2 Columns: Core Tasks & Progress */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* 1. Today's Mission (Largest Hero Card) */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-8 border border-zinc-800/80 relative overflow-hidden group shadow-xl transition-all duration-300 hover:border-zinc-700/80"
            >
              {/* Radial Accent background */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-accent-cyan/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25 px-2.5 py-0.5 rounded-md font-bold">
                    Today's Mission
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 mt-4 mb-2">
                    Master String Complements
                  </h2>
                  <p className="text-zinc-400 text-sm max-w-lg leading-relaxed font-sans">
                    Your active roadmap node is <strong className="text-zinc-200 font-semibold">Strings</strong>. Solve the complement challenges to transition dynamic array indexing concepts to rolling hashes.
                  </p>
                </div>
                
                <Link
                  to="/ai"
                  className="flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-zinc-50 text-zinc-950 font-sans font-bold text-sm hover:bg-zinc-200 active:scale-98 shadow-lg transition-all w-full md:w-auto"
                >
                  Analyze with AI Mentor <span className="text-zinc-400 font-normal">→</span>
                </Link>
              </div>

              {/* Progress detail inside mission */}
              <div className="mt-8 pt-6 border-t border-zinc-900/60 grid grid-cols-3 gap-4 text-xs font-mono text-zinc-500">
                <div>
                  <div>EST. TIME</div>
                  <div className="text-sm font-semibold text-zinc-300 mt-1">45 Minutes</div>
                </div>
                <div>
                  <div>DIFFICULTY</div>
                  <div className="text-sm font-semibold text-amber-500 mt-1">Medium</div>
                </div>
                <div>
                  <div>COMPLETION</div>
                  <div className="text-sm font-semibold text-accent-cyan mt-1">66% Done</div>
                </div>
              </div>
            </motion.div>

            {/* Sub Grid: Continue Learning & AI Recommendation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 3. Continue Learning */}
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-2xl p-6 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 shadow-md group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Continue Learning</span>
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></span>
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-2 transition-colors group-hover:text-accent-cyan">Longest Substring</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
                  Implement a sliding window to track non-repeating character sets in linear time complexity.
                </p>
                <a
                  href="https://leetcode.com/problems/longest-substring-without-repeating-characters/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono font-bold text-accent-cyan hover:underline"
                >
                  Launch LeetCode Problem ↗
                </a>
              </motion.div>

              {/* 4. AI Recommendation */}
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-2xl p-6 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 shadow-md group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">AI Recommendation</span>
                  <span className="w-2 h-2 rounded-full bg-accent-indigo"></span>
                </div>
                <h3 className="text-lg font-bold text-zinc-100 mb-2 transition-colors group-hover:text-accent-indigo">Cycle Cycle Graphs</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
                  Analysis indicates you took 40 minutes on BFS traversal. AI suggests cycle detection review.
                </p>
                <Link
                  to="/ai"
                  className="inline-flex items-center text-xs font-mono font-bold text-accent-indigo hover:underline"
                >
                  Open AI Review Session ➔
                </Link>
              </motion.div>

            </div>

            {/* 8. Recent Activity Timeline */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
            >
              <h3 className="text-base font-semibold text-zinc-100 mb-6">Recent Activity Timeline</h3>
              
              <div className="relative border-l border-zinc-800/80 pl-6 ml-3 space-y-6">
                
                {/* Event 1 */}
                <div className="relative group">
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-accent-emerald flex items-center justify-center transition-all group-hover:scale-110">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
                  </span>
                  <div className="flex justify-between text-xs text-zinc-500 mb-1">
                    <span className="font-semibold text-zinc-300 group-hover:text-zinc-50 transition-colors">Solved Valid Anagram</span>
                    <span className="font-mono text-[10px]">2 hrs ago</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans">Synced successfully via CodeMent Chrome Extension. COMPLETED status updated.</p>
                </div>

                {/* Event 2 */}
                <div className="relative group">
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-accent-cyan flex items-center justify-center transition-all group-hover:scale-110">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
                  </span>
                  <div className="flex justify-between text-xs text-zinc-500 mb-1">
                    <span className="font-semibold text-zinc-300 group-hover:text-zinc-50 transition-colors">Started Node: Strings</span>
                    <span className="font-mono text-[10px]">1 day ago</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans">Node initialized in Interactive Learning Pipeline.</p>
                </div>

                {/* Event 3 */}
                <div className="relative group">
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center transition-all group-hover:scale-110">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                  </span>
                  <div className="flex justify-between text-xs text-zinc-500 mb-1">
                    <span className="font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">Completed Node: Hashing</span>
                    <span className="font-mono text-[10px]">3 days ago</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans">Verified core concepts: Collision handling & HashMap mappings.</p>
                </div>

              </div>
            </motion.div>

          </div>

          {/* Right 1 Column: Mini Analytics Sidebar */}
          <div className="space-y-8">
            
            {/* 2. Skill Graph Snapshot */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Skill Graph Snapshot</h3>
                <Link to="/roadmap" className="text-[10px] font-mono text-accent-cyan hover:underline">
                  Full Graph ↗
                </Link>
              </div>
              
              {/* Visual Mock representation of graph connections */}
              <div className="h-44 rounded-xl bg-zinc-950 border border-zinc-800/60 flex flex-col justify-between p-4 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
                {/* Connecting background paths */}
                <svg className="absolute inset-0 w-full h-full text-zinc-900 pointer-events-none">
                  <path d="M 40,80 Q 90,30 140,80 T 240,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 40,80 Q 90,130 140,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>

                {/* Node array representation */}
                <div className="flex justify-between items-center w-full relative z-10 my-auto">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-accent-emerald/20 border border-accent-emerald flex items-center justify-center text-[10px] text-accent-emerald font-bold">
                      AR
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono">Arrays</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-accent-cyan/20 border border-accent-cyan flex items-center justify-center text-[10px] text-accent-cyan font-bold animate-pulse">
                      ST
                    </div>
                    <span className="text-[9px] text-zinc-400 font-mono">Strings</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-600 font-bold">
                      TR
                    </div>
                    <span className="text-[9px] text-zinc-600 font-mono">Trees</span>
                  </div>
                </div>

                <div className="text-[10px] text-zinc-500 font-mono text-center pt-2 border-t border-zinc-900">
                  Target: Interview Readiness Graph
                </div>
              </div>
            </motion.div>

            {/* 7. Interview Readiness Index */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md group hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Interview Readiness</h3>
                <Link to="/insights" className="text-[10px] font-mono text-accent-cyan hover:underline">
                  Insights ↗
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  {/* Circle outline progress */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" className="text-zinc-900" strokeWidth="4" stroke="currentColor" fill="transparent" />
                    {/* Animated stroke dash offset via Framer Motion on DOM directly */}
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      className="text-accent-emerald"
                      strokeWidth="4"
                      strokeDasharray={2 * Math.PI * 28}
                      initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - percent/100) }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-sm text-zinc-200">
                    {percent}%
                  </span>
                </div>
                
                <div>
                  <div className="text-lg font-bold text-zinc-100">{solved} / {total} Solved</div>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-0.5 font-sans">Estimated confidence score for target companies.</p>
                </div>
              </div>
            </motion.div>

            {/* 6. Daily Goal Progress */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md group hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Daily Goal</h3>
                <Link to="/mission" className="text-[10px] font-mono text-accent-cyan hover:underline">
                  Planner ↗
                </Link>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Target problems</span>
                  <span className="font-mono text-zinc-200">2 / 3 Completed</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: "66.6%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 5. Weak Topics Alerts */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Weak Topics</h3>
                <Link to="/revision" className="text-[10px] font-mono text-accent-cyan hover:underline">
                  Revision ↗
                </Link>
              </div>
              
              <div className="space-y-3">
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    <span className="font-sans font-semibold text-zinc-200">Dynamic Programming</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400">Review Due</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="font-sans font-semibold text-zinc-200">Graph Traversals</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">Attention</span>
                </div>

              </div>
            </motion.div>

          </div>

        </motion.div>

    </motion.div>
  );
}

export default Dashboard;
