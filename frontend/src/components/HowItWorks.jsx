function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Goal",
      description: "Set your target companies, study timelines, and daily problem-solving velocity metrics."
    },
    {
      number: "02",
      title: "Follow Roadmap",
      description: "Progress through the Interactive Learning Pipeline, covering critical patterns from Arrays to DP."
    },
    {
      number: "03",
      title: "Solve Problems",
      description: "Solve hand-picked LeetCode questions synced directly with your dashboard tracker."
    },
    {
      number: "04",
      title: "AI Mentor Support",
      description: "Receive instant, non-trivial code analysis, pattern suggestions, and conceptual code hints."
    },
    {
      number: "05",
      title: "Interview Ready",
      description: "Hit your target topic scores, review weak areas, and enter your interviews with confidence."
    }
  ];

  return (
    <section className="relative px-6 py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] radial-glow-indigo opacity-30 pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient mb-4">
            How CodeMent Works
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            A continuous loop of structured progression, problem-solving, and automated intelligence.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connecting line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-accent-cyan via-accent-indigo to-zinc-900 -z-10"></div>

          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-card rounded-xl p-6 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 relative group flex flex-col justify-between min-h-[220px] shadow-lg"
            >
              {/* Step number backdrop */}
              <div className="absolute top-4 right-4 text-4xl font-mono font-bold text-zinc-900 group-hover:text-zinc-800 transition-colors pointer-events-none">
                {step.number}
              </div>

              {/* Icon Container */}
              <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 w-12 h-12 flex items-center justify-center text-zinc-400 group-hover:text-accent-cyan group-hover:border-zinc-700 transition-all">
                {idx === 0 && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                )}
                {idx === 2 && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                )}
                {idx === 3 && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
                {idx === 4 && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
              </div>

              {/* Title & Description */}
              <div className="mt-8">
                <h3 className="text-lg font-sans font-semibold tracking-tight text-zinc-100 group-hover:text-zinc-50 transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400 font-sans">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
