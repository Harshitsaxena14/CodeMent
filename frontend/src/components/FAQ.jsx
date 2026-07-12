import { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "Is CodeMent free to use?",
      a: "Yes. The Interactive Learning Pipeline, basic roadmap tracking, and the LeetCode Chrome extension are completely free. Premium AI features have a generous free tier with daily limits."
    },
    {
      q: "How does the LeetCode extension work?",
      a: "Once installed, the browser extension detects when you are viewing a problem page on LeetCode. It dynamically pulls context from your active roadmap node and provides conceptual hints to guide your solution without spoiling the code."
    },
    {
      q: "Which programming languages are supported?",
      a: "Our AI Mentor and extension support all major interview languages including JavaScript, Python, C++, Java, Go, TypeScript, and Rust."
    },
    {
      q: "How does this compare to just using ChatGPT or LeetCode Premium?",
      a: "LeetCode Premium is a library of problems but lacks structured guidance. ChatGPT gives away solutions instantly, which destroys learning. CodeMent acts as a mentor—guiding you concept-by-concept, prompting you with hints when you're stuck, and tracking your revision schedules."
    },
    {
      q: "Can I import my existing LeetCode progress?",
      a: "Yes. Once you install the extension, you can sync your solved history to instantly populate and mark previous nodes as completed in your Interactive Learning Pipeline."
    }
  ];

  const toggleAccordion = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="relative px-6 py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow-cyan opacity-25 pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan px-3 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded-full">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient mt-6 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Everything you need to know about the platform, extension, and learning pipeline.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => toggleAccordion(idx)}
                className={`glass-card rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpen ? "border-zinc-700 bg-zinc-900/40" : "border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6">
                  <h3 className="font-sans font-semibold text-sm sm:text-base text-zinc-100 pr-4">
                    {faq.q}
                  </h3>
                  <div className={`p-1 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-zinc-200" : ""}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Answer Area */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/40 pt-4">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
