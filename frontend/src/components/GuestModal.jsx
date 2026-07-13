import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestModal() {
  const { showGuestModal, setShowGuestModal } = useAuth();
  const navigate = useNavigate();

  if (!showGuestModal) return null;

  const handleAction = (path) => {
    setShowGuestModal(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowGuestModal(false)}
          className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl overflow-hidden z-10 text-center"
        >
          {/* Accent glow line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-accent-cyan via-accent-indigo to-accent-cyan"></div>

          <div className="mx-auto w-12 h-12 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-zinc-50 tracking-tight mb-2">
            Unlock Full DSA Experience
          </h3>
          
          <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
            Create a free account to save your learning progress, sync completed LeetCode problems, and store your personalized AI Mentor conversations.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => handleAction("/register")}
              className="w-full py-3 rounded-xl bg-zinc-50 text-zinc-950 font-sans font-bold text-sm hover:bg-zinc-200 active:scale-98 transition-all shadow-md"
            >
              Create Free Account
            </button>

            <button
              onClick={() => handleAction("/login")}
              className="w-full py-3 rounded-xl bg-zinc-900 border border-zinc-850 text-zinc-200 font-sans font-semibold text-sm hover:bg-zinc-800/60 active:scale-98 transition-all"
            >
              Sign In
            </button>

            <button
              onClick={() => setShowGuestModal(false)}
              className="w-full py-2.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-sans"
            >
              Continue Browsing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default GuestModal;
