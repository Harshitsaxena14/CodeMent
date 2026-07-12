import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-16 bg-zinc-950 border-t border-zinc-900 overflow-hidden text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <svg className="w-5 h-5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
            <span className="font-sans font-bold text-lg tracking-tight text-zinc-50 group-hover:text-accent-cyan transition-colors">
              CodeMent
            </span>
          </Link>
          <p className="text-zinc-500 font-sans leading-relaxed max-w-[200px]">
            Interactive DSA learning and AI mentorship designed for high-performance engineers.
          </p>
          <span className="text-zinc-600 font-mono text-[11px] mt-2 block">
            © {currentYear} CodeMent Inc. All rights reserved.
          </span>
        </div>

        {/* Product Column */}
        <div className="flex flex-col gap-3">
          <span className="font-mono uppercase tracking-widest text-zinc-500 font-bold mb-1">Product</span>
          <Link to="/roadmap" className="text-zinc-400 hover:text-zinc-50 transition-all font-sans">
            Interactive Roadmap
          </Link>
          <Link to="/ai" className="text-zinc-400 hover:text-zinc-50 transition-all font-sans">
            AI Mentor Chat
          </Link>
          <a href="#extension" className="text-zinc-400 hover:text-zinc-50 transition-all font-sans">
            LeetCode Chrome Extension
          </a>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col gap-3">
          <span className="font-mono uppercase tracking-widest text-zinc-500 font-bold mb-1">Resources</span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-50 transition-all font-sans">
            GitHub Repository
          </a>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-50 transition-all font-sans">
            LeetCode Platform
          </a>
          <a href="#features" className="text-zinc-400 hover:text-zinc-50 transition-all font-sans">
            Key Features
          </a>
        </div>

        {/* System Status Column */}
        <div className="flex flex-col gap-3">
          <span className="font-mono uppercase tracking-widest text-zinc-500 font-bold mb-1">System status</span>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse"></span>
            <span className="font-mono text-zinc-300">All Systems Operational</span>
          </div>
          <div className="text-zinc-600 font-mono mt-1">
            API v1.4.2 • Extension v1.0.8
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
