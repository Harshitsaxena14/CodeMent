import { Link } from "react-router-dom";

function CTA() {
  const token = localStorage.getItem("token");

  return (
    <section className="relative px-6 py-28 bg-zinc-950 border-t border-zinc-900 overflow-hidden text-center">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] radial-glow-indigo opacity-40 pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient mb-6">
          Ready to master your DSA path?
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mb-10 leading-relaxed font-sans">
          Join over 5,000+ developers mapping their roadmap, solving matched LeetCode problems, and passing their technical interviews.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to={token ? "/dashboard" : "/register"}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-xl bg-zinc-50 text-zinc-950 font-sans font-bold text-base hover:bg-zinc-200 active:scale-98 shadow-[0_4px_20px_rgba(255,255,255,0.08)] transition-all"
          >
            Start Learning Free <span className="text-zinc-500 font-normal">→</span>
          </Link>
          <Link
            to="/roadmap"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800 text-zinc-50 font-sans font-semibold text-base hover:bg-zinc-900/60 active:scale-98 transition-all"
          >
            View Full Roadmap
          </Link>
        </div>

        {/* Risk reduction line */}
        <span className="text-xs font-mono text-zinc-500 mt-6 block">
          No credit card required. Free roadmap & chrome extension.
        </span>
      </div>
    </section>
  );
}

export default CTA;
