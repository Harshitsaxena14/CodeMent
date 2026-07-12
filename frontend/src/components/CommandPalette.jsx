import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { completeRoadmap } from "../data/roadmap/index.js";

function CommandPalette() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Toggle Command Palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Build dynamic indexing dataset
  const getSearchItems = () => {
    const items = [];

    // 1. App Pages
    items.push(
      { id: "page-dashboard", title: "Dashboard", category: "Navigation", link: "/dashboard", shortcut: "G + D", type: "page" },
      { id: "page-roadmap", title: "Roadmap", category: "Navigation", link: "/roadmap", shortcut: "G + R", type: "page" },
      { id: "page-ai", title: "AI Mentor Assistance", category: "Navigation", link: "/ai", shortcut: "G + A", type: "page" },
      { id: "page-insights", title: "Insights & Analytics", category: "Navigation", link: "/insights", shortcut: "G + I", type: "page" },
      { id: "page-revision", title: "Revision Planner", category: "Navigation", link: "/revision", shortcut: "G + V", type: "page" },
      { id: "page-mission", title: "Daily Mission Board", category: "Navigation", link: "/mission", shortcut: "G + M", type: "page" }
    );

    // 2. Curriculum Topics, Modules, Lessons, & Problems
    completeRoadmap.forEach((topic) => {
      items.push({
        id: `topic-${topic.topicId}`,
        title: `${topic.title} Learning Path`,
        category: "Roadmap Topic",
        link: `/roadmap/${topic.topicId}`,
        type: "topic"
      });

      topic.modules.forEach((mod) => {
        items.push({
          id: `mod-${mod.id}`,
          title: mod.title,
          category: `Module in ${topic.title}`,
          link: `/roadmap/${topic.topicId}`,
          type: "module"
        });

        mod.lessons.forEach((lesson) => {
          items.push({
            id: `lesson-${lesson.id}`,
            title: lesson.title,
            category: `Lesson in ${mod.title}`,
            link: `/roadmap/${topic.topicId}`,
            type: "lesson"
          });

          const problems = lesson.linkedPracticeProblems || lesson.practiceProblems || [];
          problems.forEach((prob) => {
            items.push({
              id: `prob-${prob.id || prob.title}`,
              title: prob.title || prob.name,
              category: `Practice Problem (${prob.difficulty})`,
              link: prob.link,
              isExternal: true,
              type: "problem"
            });
          });
        });
      });
    });

    return items;
  };

  const allItems = getSearchItems();

  // Filter items matching query
  const filteredItems = allItems.filter((item) => {
    const query = search.toLowerCase().trim();
    if (!query) return item.type === "page" || item.category === "Roadmap Topic"; // Default recent list
    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  // Handle keyboard events when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const activeItem = filteredItems[selectedIndex];
        if (activeItem) {
          triggerAction(activeItem);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  // Adjust scroll position inside Command Palette container dynamically
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.children[selectedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const triggerAction = (item) => {
    setIsOpen(false);
    if (item.isExternal) {
      window.open(item.link, "_blank", "noopener,noreferrer");
    } else {
      navigate(item.link);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "page":
        return (
          <svg className="w-4 h-4 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        );
      case "topic":
        return (
          <svg className="w-4 h-4 text-accent-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case "module":
        return (
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "lesson":
        return (
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "problem":
      default:
        return (
          <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 select-none">
          {/* Blur Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-955/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette Box Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-full max-w-xl bg-zinc-950/95 border border-zinc-800/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-900">
              <svg className="w-5 h-5 text-zinc-555 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search topics, lessons, problems, or navigate..."
                className="flex-1 bg-transparent border-none text-zinc-100 text-sm focus:outline-none placeholder-zinc-600 outline-none"
              />
              <span className="text-[10px] font-mono text-zinc-650 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded shadow">
                ESC
              </span>
            </div>

            {/* Results items */}
            <div
              ref={resultsContainerRef}
              className="max-h-[320px] overflow-y-auto p-2.5 space-y-0.5"
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => {
                  const isHighlighted = selectedIndex === index;
                  return (
                    <div
                      key={item.id}
                      onClick={() => triggerAction(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-all ${
                        isHighlighted
                          ? "bg-zinc-900 border border-zinc-850/80 text-zinc-100"
                          : "border border-transparent text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        {getIcon(item.type)}
                        <span className="text-xs font-semibold truncate leading-none">
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono uppercase text-zinc-650 mt-0.5">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.shortcut && (
                          <span className="text-[9px] font-mono text-zinc-555 border border-zinc-850 px-1.5 py-0.5 rounded bg-zinc-950">
                            {item.shortcut}
                          </span>
                        )}
                        {isHighlighted && (
                          <span className="text-[9px] font-mono text-accent-cyan">
                            ↵ Enter
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-zinc-650 text-xs font-sans">
                  No matching workspace queries found.
                </div>
              )}
            </div>

            {/* Hint Footer bar */}
            <div className="px-4 py-2 bg-zinc-950/60 border-t border-zinc-900 text-[9px] font-mono text-zinc-555 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>Enter Select</span>
              </div>
              <span>Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
