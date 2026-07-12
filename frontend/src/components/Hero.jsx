import { Link } from "react-router-dom";

function Hero() {
  const token = localStorage.getItem("token");

  return (
    <section className="relative pt-32 pb-16 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 radial-glow-indigo pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Announcement Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-mono font-medium tracking-wide text-zinc-300 mb-8 border border-zinc-800/60 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
        </span>
        CODEMENT 1.0 IS NOW IN PUBLIC BETA
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gradient max-w-5xl leading-[1.08] mb-6">
        Stop guessing your<br />
        <span className="text-gradient-cyan">DSA Interview journey.</span>
      </h1>

      {/* Supporting Description */}
      <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
        Follow a structured roadmap, solve the right problems, track your metrics, 
        and let an AI mentor guide you from beginner to interview-ready.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <Link
          to={token ? "/dashboard" : "/register"}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-xl bg-zinc-50 text-zinc-950 font-sans font-bold text-base hover:bg-zinc-200 active:scale-98 shadow-[0_4px_20px_rgba(255,255,255,0.08)] transition-all"
        >
          Start Learning Free <span className="text-zinc-500 font-normal">→</span>
        </Link>

        <a
          href="#pipeline"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("pipeline")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-xl bg-zinc-950/40 border border-zinc-800 text-zinc-50 font-sans font-semibold text-base hover:bg-zinc-900/60 active:scale-98 transition-all"
        >
          Explore Pipeline
        </a>
      </div>
      
      {/* Visual Indicator of Connection to Pipeline */}
      <div className="flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-xs font-mono text-zinc-500">SCROLL TO PIPELINE</span>
        <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;