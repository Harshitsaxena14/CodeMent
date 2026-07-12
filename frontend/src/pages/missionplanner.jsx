import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/axios";

const initialTasks = [
  {
    id: "task-1",
    title: "Verify HashMap complement logic",
    duration: 20,
    source: "Revision",
    priority: "Critical",
    status: "Pending",
    topic: "Arrays & Hashing"
  },
  {
    id: "task-2",
    title: "Implement sliding window bounds",
    duration: 35,
    source: "Practice",
    priority: "High",
    status: "Pending",
    topic: "Strings"
  },
  {
    id: "task-3",
    title: "Analyze rolling hash collision bounds",
    duration: 30,
    source: "AI Mentor",
    priority: "Medium",
    status: "Pending",
    topic: "Hashing"
  },
  {
    id: "task-4",
    title: "Complete BFS traversals validation",
    duration: 25,
    source: "Quiz",
    priority: "Medium",
    status: "Pending",
    topic: "Trees"
  }
];

function MissionPlanner() {
  const [tasks, setTasks] = useState(initialTasks);
  const [timeBudget, setTimeBudget] = useState(90); 
  const [planningStatus, setPlanningStatus] = useState("Optimized");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        await API.get("/progress");
      } catch (error) {
        console.log("Mission Planner sync progress logs.");
      }
    };
    fetchProgress();
  }, []);

  const getTasksInBudget = () => {
    let accumulatedTime = 0;
    return tasks.map((task) => {
      if (accumulatedTime + task.duration > timeBudget && task.status === "Pending") {
        return { ...task, status: "Postponed" };
      }
      if (task.status !== "Postponed" && task.status !== "Skipped") {
        accumulatedTime += task.duration;
      }
      return task;
    });
  };

  const budgetedTasks = getTasksInBudget();

  const totalBudgetedDuration = budgetedTasks
    .filter((t) => t.status !== "Postponed" && t.status !== "Skipped")
    .reduce((sum, t) => sum + t.duration, 0);

  const completedDuration = budgetedTasks
    .filter((t) => t.status === "Completed")
    .reduce((sum, t) => sum + t.duration, 0);

  const completionPercent = totalBudgetedDuration > 0 
    ? Math.round((completedDuration / totalBudgetedDuration) * 100) 
    : 0;

  const handleMarkComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "Completed" } : t))
    );
  };

  const handleSkipTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "Skipped" } : t))
    );
  };

  const moveTask = (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tasks.length) return;
    
    setTasks((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[newIndex];
      copy[newIndex] = temp;
      return copy;
    });
  };

  const handleRegenerateSchedule = () => {
    setPlanningStatus("Re-optimizing...");
    setTimeout(() => {
      setTasks((prev) => {
        const copy = [...prev];
        copy.sort((a, b) => {
          if (a.status === "Completed" || b.status === "Completed") return 0;
          const priorities = { Critical: 3, High: 2, Medium: 1 };
          return (priorities[b.priority] || 0) - (priorities[a.priority] || 0);
        });
        return copy.map(t => t.status === "Skipped" || t.status === "Postponed" ? { ...t, status: "Pending" } : t);
      });
      setPlanningStatus("Optimized");
    }, 800);
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
              AI Daily study planner
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mt-4 mb-2">
              Master String Complements
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed font-sans">
              Your study schedule adapts dynamically to your calendar availability, memory scores, and topic dependencies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto flex-shrink-0">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 flex items-center gap-4">
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
                    animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - completionPercent / 100) }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-sm text-zinc-200">
                  {completionPercent}%
                </span>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 font-mono">MISSION PROGRESS</div>
                <div className="text-xs font-bold text-zinc-300 mt-0.5">{completedDuration}m / {totalBudgetedDuration}m</div>
                <div className="text-[9px] font-mono text-zinc-500 mt-1">Status: {planningStatus}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Workspace Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-8">
          
          {/* Available Study Time budget toggles */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md space-y-4"
          >
            <div>
              <h3 className="text-base font-semibold text-zinc-100">Daily Study Time Budget</h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">Adapt the schedule density to fit your current calendar constraints.</p>
            </div>

            <div className="flex gap-3">
              {[60, 90, 120].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setTimeBudget(mins)}
                  className={`px-5 py-2 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/40 ${
                    timeBudget === mins
                      ? "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/35 shadow-md font-bold"
                      : "bg-zinc-900 border-zinc-850 text-zinc-400 hover:text-zinc-250"
                  }`}
                >
                  {mins} Minutes Budgeted
                </button>
              ))}
            </div>
          </motion.div>

          {/* Today's Schedule drag-like reordered list */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2 font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse"></span>
                <span>Today's Task Sequence</span>
              </h3>
              
              <button
                onClick={handleRegenerateSchedule}
                className="text-[10px] font-mono text-accent-cyan hover:underline cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
              >
                AI Re-Optimize Priority ➔
              </button>
            </div>

            {/* Framer motion layout transitions for tasks reordering */}
            <motion.div layout className="space-y-3">
              <AnimatePresence>
                {budgetedTasks.map((task, idx) => {
                  const isCompleted = task.status === "Completed";
                  const isSkipped = task.status === "Skipped";
                  const isPostponed = task.status === "Postponed";

                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      className={`glass-card rounded-xl p-5 border transition-all duration-300 focus-within:ring-1 focus-within:ring-accent-cyan/40 ${
                        isCompleted
                          ? "border-accent-emerald/20 bg-accent-emerald/5 opacity-60"
                          : isSkipped
                          ? "border-zinc-900/60 opacity-40 bg-zinc-950/20"
                          : isPostponed
                          ? "border-yellow-500/20 bg-yellow-500/5 opacity-50"
                          : "border-zinc-800/80 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        
                        <div className="flex gap-3 items-start">
                          {/* Order buttons */}
                          <div className="flex flex-col gap-1 select-none">
                            <button
                              disabled={idx === 0 || isCompleted || isSkipped || isPostponed}
                              onClick={() => moveTask(idx, "up")}
                              className="text-[9px] hover:text-zinc-100 disabled:opacity-20 text-zinc-650 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                              aria-label="Move Task Up"
                            >
                              ▲
                            </button>
                            <button
                              disabled={idx === tasks.length - 1 || isCompleted || isSkipped || isPostponed}
                              onClick={() => moveTask(idx, "down")}
                              className="text-[9px] hover:text-zinc-100 disabled:opacity-20 text-zinc-650 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                              aria-label="Move Task Down"
                            >
                              ▼
                            </button>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono uppercase text-zinc-500">
                                {task.topic}
                              </span>
                              <span className={`text-[9px] font-mono ${
                                task.priority === "Critical" ? "text-red-500 font-bold" : "text-zinc-400"
                              }`}>
                                {task.priority} Priority
                              </span>
                            </div>

                            <h4 className={`text-sm font-semibold mt-1.5 ${
                              isCompleted ? "line-through text-zinc-500 font-sans" : "text-zinc-100 font-sans"
                            }`}>
                              {task.title}
                            </h4>

                            <div className="mt-2 flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                              <span>DURATION: {task.duration}m</span>
                              <span>•</span>
                              <span>SOURCE: {task.source}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 font-mono">
                          {isCompleted && (
                            <span className="text-[10px] text-accent-emerald font-bold px-2">COMPLETED</span>
                          )}
                          {isSkipped && (
                            <span className="text-[10px] text-zinc-600 font-bold px-2">SKIPPED</span>
                          )}
                          {isPostponed && (
                            <span className="text-[10px] text-yellow-500 font-bold px-2" title="Exceeds daily time budget">
                              POSTPONED BY AI
                            </span>
                          )}

                          {task.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleSkipTask(task.id)}
                                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-450 hover:text-zinc-200 text-[10px] font-semibold cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                              >
                                Skip
                              </button>
                              <button
                                onClick={() => handleMarkComplete(task.id)}
                                className="px-2.5 py-1 rounded bg-zinc-50 text-zinc-950 hover:bg-zinc-200 text-[10px] font-bold cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                              >
                                Complete
                              </button>
                            </>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

        {/* Right Column sidebar */}
        <div className="space-y-8">
          
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-4 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-indigo animate-pulse"></span>
              <h3 className="text-base font-semibold text-zinc-100 font-sans">AI Daily Adjustments</h3>
            </div>
            
            <div className="space-y-3.5 text-xs text-zinc-400 font-sans leading-relaxed">
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-850">
                "You struggled with **Graph Cycle Detection** yesterday. **Trees post-order** traversal study tasks have been postponed until tomorrow."
              </div>
              <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-850">
                "Arrays Spaced Memory Retention has dropped. **20 Mins complement indexing review** has been prioritized first."
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Missed Tasks</h3>
            <div className="space-y-3 font-mono text-xs text-zinc-500">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 flex justify-between items-center">
                <span>Breadth First Search tree logs</span>
                <span className="text-[10px] font-bold text-red-500">Postponed</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Weekly Goal Targets</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>Weekly Time Budgeted</span>
                <span className="text-zinc-200">12 / 15 Hours Completed</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <motion.div className="h-full bg-accent-cyan" initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 0.5 }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md"
          >
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-4">Smart Recommendations</h3>
            <div className="space-y-2 font-mono text-xs text-zinc-400">
              <div className="p-2.5 rounded bg-zinc-900/30 border border-zinc-900">
                Google readiness score drops if **Strings** node is not finalized by tomorrow.
              </div>
              <div className="p-2.5 rounded bg-zinc-900/30 border border-zinc-900">
                AI recommends a **15 Mins Quiz** on Two-Pointer boundary sliding variables today.
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

    </motion.div>
  );
}

export default MissionPlanner;
