import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import CommandPalette from "./CommandPalette";
import GuestModal from "./GuestModal";
import { useAuth } from "../context/AuthContext";

function SidebarLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isGuest, logout, triggerGuestModal } = useAuth();

  // Load expanded state from localStorage (default to true)
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarExpanded", JSON.stringify(next));
      return next;
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z M3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z M13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6z M13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
    {
      path: "/roadmap",
      label: "Roadmap",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h3z M10.5 18.72a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v9c0 .414.336.75.75.75h3z M3 18.72a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v12c0 .414.336.75.75.75h3z" />
        </svg>
      )
    },
    {
      path: "/ai",
      label: "AI Mentor",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L14.907 14.993C15.828 15.657 16.945 16.035 18.125 16.035C21.369 16.035 24 13.435 24 10.229C24 7.023 21.369 4.423 18.125 4.423C14.881 4.423 12.25 7.023 12.25 10.229C12.25 11.4 12.597 12.492 13.2 13.4L8.1 14.302L9.813 15.904z" />
        </svg>
      )
    },
    {
      path: "/insights",
      label: "Insights",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H7.5zm.75 12.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75-3.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zm0-3.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6z" />
        </svg>
      )
    },
    {
      path: "/revision",
      label: "Revision Planner",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    },
    {
      path: "/mission",
      label: "Daily Mission",
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-zinc-955 text-zinc-100 overflow-hidden font-sans">
      {/* Collapsible left sidebar */}
      <motion.aside
        animate={{ width: isExpanded ? 270 : 76 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="h-screen bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between flex-shrink-0 z-30 select-none"
      >
        <div className="flex flex-col space-y-6 pt-6">
          {/* Logo and collapse button */}
          <div className="px-5 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
              <svg className="w-6 h-6 text-accent-cyan flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-bold text-lg tracking-tight text-zinc-50 font-sans"
                >
                  CodeMent
                </motion.span>
              )}
            </Link>

            {isExpanded && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                aria-label="Collapse sidebar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Toggle button on collapsed state */}
          {!isExpanded && (
            <div className="px-5">
              <button
                onClick={toggleSidebar}
                className="w-full flex items-center justify-center p-2 rounded-lg bg-zinc-900/60 border border-zinc-855 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
                aria-label="Expand sidebar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Navigation link sets */}
          <nav className="px-3 flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all relative group outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
                    isActive
                      ? "bg-zinc-900 text-accent-cyan font-bold"
                      : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40"
                  }`}
                >
                  {item.icon}

                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-semibold tracking-tight font-sans"
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {!isExpanded && (
                    <div className="absolute left-16 bg-zinc-955 border border-zinc-850 text-[10px] font-mono text-zinc-300 px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile and Logout controls */}
        <div className="p-3 border-t border-zinc-900 space-y-1">
          {/* Settings/Profile shortcut */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3.5 px-3 py-3 rounded-xl text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/40 relative group outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {isExpanded && <span className="text-xs font-semibold font-sans">Profile & Settings</span>}
            {!isExpanded && (
              <div className="absolute left-16 bg-zinc-950 border border-zinc-855 text-[10px] font-mono text-zinc-300 px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40 whitespace-nowrap">
                Profile
              </div>
            )}
          </Link>

          {/* Logout Trigger */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-3 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all relative group outline-none focus-visible:ring-1 focus-visible:ring-red-400 cursor-pointer text-left"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            {isExpanded && <span className="text-xs font-semibold font-sans">Logout</span>}
            {!isExpanded && (
              <div className="absolute left-16 bg-zinc-950 border border-zinc-855 text-[10px] font-mono text-zinc-300 px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40 whitespace-nowrap">
                Logout
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main content body canvas */}
      <main className="flex-1 h-screen overflow-hidden relative flex flex-col">
        {isGuest && (
          <div className="w-full bg-accent-cyan/10 border-b border-accent-cyan/20 px-6 py-2.5 flex items-center justify-between text-[11px] font-mono text-accent-cyan z-20 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
              </span>
              <span>Running in <strong className="text-zinc-200">Demo Mode</strong>. Actions will not be saved.</span>
            </div>
            <button
              onClick={triggerGuestModal}
              className="px-2.5 py-0.5 rounded bg-accent-cyan text-zinc-950 font-bold hover:bg-zinc-200 transition-colors uppercase tracking-wider text-[9px] cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Global Guest Mode Modal */}
      <GuestModal />
    </div>
  );
}

export default SidebarLayout;
