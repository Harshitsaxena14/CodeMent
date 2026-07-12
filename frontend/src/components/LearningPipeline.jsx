import { useState } from "react";

const pipelineNodes = [
  {
    id: "arrays",
    title: "Arrays",
    status: "completed",
    concepts: ["Traversal", "Two Pointer", "Prefix Sum", "Kadane's Algorithm"],
    problems: [
      { name: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
      { name: "Move Zeroes", difficulty: "Easy", link: "https://leetcode.com/problems/move-zeroes/" },
      { name: "Maximum Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/" }
    ],
    revisionCount: 3
  },
  {
    id: "hashing",
    title: "Hashing",
    status: "completed",
    concepts: ["HashMap Basics", "Collision Handling", "Direct Address Tables"],
    problems: [
      { name: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/" },
      { name: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" }
    ],
    revisionCount: 2
  },
  {
    id: "strings",
    title: "Strings",
    status: "active",
    concepts: ["String Matching", "KMP Algorithm", "Rabin-Karp Rolling Hash"],
    problems: [
      { name: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/" },
      { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" }
    ],
    revisionCount: 1
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    status: "locked",
    concepts: ["Fixed Window Size", "Dynamic Window Size", "Shrinking Optimizations"],
    problems: [
      { name: "Minimum Size Subarray Sum", difficulty: "Medium", link: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
      { name: "Longest Repeating Character Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" }
    ],
    revisionCount: 0
  },
  {
    id: "binary-search",
    title: "Binary Search",
    status: "locked",
    concepts: ["Standard BS", "Search Space Reduction", "Rotated Sorted Array"],
    problems: [
      { name: "Search in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" }
    ],
    revisionCount: 0
  },
  {
    id: "trees",
    title: "Trees",
    status: "locked",
    concepts: ["DFS & BFS Traversals", "Binary Search Trees (BST)", "LCA & Depth Analysis"],
    problems: [
      { name: "Invert Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/" },
      { name: "Validate Binary Search Tree", difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/" }
    ],
    revisionCount: 0
  },
  {
    id: "graphs",
    title: "Graphs",
    status: "locked",
    concepts: ["BFS/DFS Traversals", "Cycle Detection", "Topological Sort", "Dijkstra's Shortest Path"],
    problems: [
      { name: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" },
      { name: "Course Schedule", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/" }
    ],
    revisionCount: 0
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    status: "locked",
    concepts: ["Memoization vs Tabulation", "0/1 Knapsack Pattern", "Longest Common Subsequence"],
    problems: [
      { name: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/" },
      { name: "Coin Change", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change/" }
    ],
    revisionCount: 0
  }
];

function LearningPipeline() {
  const [expandedNode, setExpandedNode] = useState("strings");

  const toggleExpand = (nodeId) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return {
          border: "border-accent-emerald/40 hover:border-accent-emerald/80",
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]",
          badge: "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20",
          iconColor: "text-accent-emerald",
          headerColor: "text-zinc-100"
        };
      case "active":
        return {
          border: "border-accent-cyan/80 shadow-[0_0_25px_rgba(6,182,212,0.15)]",
          glow: "shadow-[0_0_30px_rgba(6,182,212,0.25)]",
          badge: "bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30 animate-pulse",
          iconColor: "text-accent-cyan",
          headerColor: "text-zinc-50 font-bold"
        };
      case "locked":
      default:
        return {
          border: "border-zinc-800 hover:border-zinc-700",
          glow: "shadow-none",
          badge: "bg-zinc-800/40 text-zinc-500 border-zinc-700/40",
          iconColor: "text-zinc-600",
          headerColor: "text-zinc-400 group-hover:text-zinc-200"
        };
    }
  };

  return (
    <section id="pipeline" className="relative px-6 py-24 bg-zinc-950 grid-bg overflow-hidden border-t border-zinc-900">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-glow-cyan opacity-40 pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gradient mb-4">
            The Interactive Learning Pipeline
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
            Click on a topic node below to expand concepts, view questions synced from LeetCode, and track AI revision status.
          </p>
        </div>

        {/* Nodes Container */}
        <div className="flex flex-col items-center">
          {pipelineNodes.map((node, index) => {
            const isExpanded = expandedNode === node.id;
            const style = getStatusStyles(node.status);

            return (
              <div key={node.id} className="w-full flex flex-col items-center">
                {/* Node Box */}
                <div
                  onClick={() => toggleExpand(node.id)}
                  className={`w-full max-w-2xl glass-card rounded-xl p-6 border cursor-pointer group transition-all duration-300 ${style.border} ${style.glow} ${
                    node.status === "completed"
                      ? "animate-[node-pulse-completed_1.0s_infinite_ease-in-out]"
                      : node.status === "active"
                      ? "animate-[node-pulse-active_1.0s_infinite_ease-in-out]"
                      : "animate-[node-pulse-locked_1.0s_infinite_ease-in-out]"
                  }`}
                  style={{
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Status Icon */}
                      <div className={`p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 ${style.iconColor}`}>
                        {node.status === "completed" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {node.status === "active" && (
                          <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {node.status === "locked" && (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </div>

                      {/* Header info */}
                      <div>
                        <h3 className={`text-xl font-sans tracking-tight transition-colors ${style.headerColor}`}>
                          {node.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 font-mono">
                          <span>{node.concepts.length} Concepts</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                          <span>{node.problems.length} Problems</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge & Toggle */}
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${style.badge}`}>
                        {node.status}
                      </span>
                      <svg
                        className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 text-zinc-300" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded Content Area */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded ? "grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-zinc-900" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: Concepts list */}
                        <div>
                          <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Core Concepts</h4>
                          <div className="flex flex-wrap gap-2">
                            {node.concepts.map((concept, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700 transition-colors"
                              >
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: LeetCode Problems & Revision status */}
                        <div>
                          <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Curated Problems</h4>
                          <div className="flex flex-col gap-2">
                            {node.problems.map((prob, pIdx) => (
                              <a
                                key={pIdx}
                                href={prob.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all text-sm group/item"
                              >
                                <span className="text-zinc-300 group-hover/item:text-zinc-50 transition-colors">
                                  {prob.name}
                                </span>
                                <span
                                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                                    prob.difficulty === "Easy"
                                      ? "bg-accent-emerald/10 text-accent-emerald"
                                      : "bg-amber-500/10 text-amber-500"
                                  }`}
                                >
                                  {prob.difficulty}
                                </span>
                              </a>
                            ))}
                          </div>

                          {node.status !== "locked" && node.revisionCount > 0 && (
                            <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-accent-indigo/5 border border-accent-indigo/10 text-xs">
                              <span className="text-zinc-400 font-mono">AI Revision Scheduler</span>
                              <span className="text-accent-indigo font-semibold">{node.revisionCount} Problems Due</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Line Connector */}
                {index < pipelineNodes.length - 1 && (
                  <div className="relative w-[2px] h-16 my-1">
                    {/* Background Line */}
                    <div className="absolute inset-0 bg-zinc-900"></div>
                    {/* Glowing flow animation line */}
                    <div
                      className={`absolute inset-0 transition-all duration-700 ${
                        node.status === "completed"
                          ? "bg-gradient-to-b from-accent-emerald to-accent-cyan"
                          : node.status === "active"
                          ? "bg-gradient-to-b from-accent-cyan to-zinc-900 animate-pulse"
                          : "bg-zinc-900"
                      }`}
                    ></div>

                    {/* Glowing Flowing Particles */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full filter blur-[0.5px] ${
                        node.status === "completed"
                          ? "bg-accent-emerald shadow-[0_0_8px_#10b981]"
                          : node.status === "active"
                          ? "bg-accent-cyan shadow-[0_0_8px_#06b6d4]"
                          : "bg-accent-indigo shadow-[0_0_8px_#6366f1]"
                      }`}
                      style={{
                        animation: "travel-particle 2s infinite linear",
                        animationDelay: `${index * 0.2}s`
                      }}
                    />
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full filter blur-[0.5px] ${
                        node.status === "completed"
                          ? "bg-accent-cyan shadow-[0_0_8px_#06b6d4]"
                          : node.status === "active"
                          ? "bg-accent-indigo shadow-[0_0_8px_#6366f1]"
                          : "bg-zinc-700 shadow-[0_0_6px_#3f3f46]"
                      }`}
                      style={{
                        animation: "travel-particle 2s infinite linear",
                        animationDelay: `${index * 0.2 + 1.0}s`
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LearningPipeline;
