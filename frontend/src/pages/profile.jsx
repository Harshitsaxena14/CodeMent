import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function Profile() {
  const { isGuest, triggerGuestModal } = useAuth();
  
  // Profile Form States
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("guest@codement.dev");
  const [leetcodeUsername, setLeetcodeUsername] = useState("demouser_dsa");
  
  // Stats
  const [streak, setStreak] = useState(27);
  const [solved, setSolved] = useState(187);
  const [roadmapProgress, setRoadmapProgress] = useState(64);
  const [readiness, setReadiness] = useState(78);

  useEffect(() => {
    if (!isGuest) {
      // Load real user details if authenticated
      const fetchProfile = async () => {
        try {
          const res = await API.get("/auth/me"); // hypothetically gets user
          if (res.data) {
            setName(res.data.name || "User");
            setEmail(res.data.email || "");
          }
        } catch (e) {
          console.log("Profile: fallback to standard user details");
        }
      };
      fetchProfile();
    }
  }, [isGuest]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    triggerGuestModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="noise-bg min-h-screen bg-zinc-955 text-zinc-100 font-sans flex flex-col pt-10 pb-12 px-6 md:px-12 max-w-7xl mx-auto space-y-8 select-none"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Header */}
      <div className="border-b border-zinc-900 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Profile & Settings</h1>
        <p className="text-sm text-zinc-400 mt-1 font-sans">Manage your personal profile, credentials, and track your interview goals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Avatar and stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md text-center relative overflow-hidden">
            {/* Background Radial Glow */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-cyan"></div>
            
            {/* Avatar representation */}
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-indigo p-[2px]">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-zinc-50 font-bold text-2xl">
                {name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold text-zinc-50 tracking-tight">{name}</h2>
              {isGuest && (
                <span className="text-[9px] font-mono uppercase bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25 px-2 py-0.5 rounded font-bold animate-pulse">
                  Demo Mode
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-550 mt-1.5 font-sans">{email}</p>

            {/* Badges unlocked */}
            <div className="mt-6 pt-6 border-t border-zinc-900/60 text-left">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">Earned Achievements</span>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-300 font-mono">
                  🔥 27d Streak
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-300 font-mono">
                  🎯 HashMap Expert
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-300 font-mono">
                  👑 Arrays Master
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Metrics */}
          <div className="glass-card rounded-2xl p-5 border border-zinc-800/80 shadow-md space-y-4">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Metrics Overview</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-900 text-center">
                <div className="text-2xl font-bold font-mono text-accent-cyan">{solved}</div>
                <div className="text-[9px] text-zinc-500 uppercase font-mono mt-1">Solved</div>
              </div>
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-900 text-center">
                <div className="text-2xl font-bold font-mono text-amber-500">{streak} Days</div>
                <div className="text-[9px] text-zinc-500 uppercase font-mono mt-1">Streak</div>
              </div>
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-900 text-center">
                <div className="text-2xl font-bold font-mono text-zinc-200">{roadmapProgress}%</div>
                <div className="text-[9px] text-zinc-500 uppercase font-mono mt-1">Completed</div>
              </div>
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-900 text-center">
                <div className="text-2xl font-bold font-mono text-accent-emerald">{readiness}%</div>
                <div className="text-[9px] text-zinc-500 uppercase font-mono mt-1">Readiness</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Account and credentials form */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6 border border-zinc-800/80 shadow-md">
            <h3 className="text-base font-semibold text-zinc-100 border-b border-zinc-900 pb-4 mb-6">Account Settings</h3>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-accent-cyan transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-accent-cyan transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                  LeetCode Username (Sync Target)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                    placeholder="leetcode_id"
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-accent-cyan transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={triggerGuestModal}
                    className="px-4 py-3 rounded-xl bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-semibold transition-all cursor-pointer"
                  >
                    Sync
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900/60">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">Security Preferences</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-accent-cyan transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-accent-cyan transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-zinc-50 text-zinc-950 font-sans font-bold text-sm hover:bg-zinc-200 active:scale-98 transition-all cursor-pointer"
                >
                  Save Profile Details
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default Profile;
