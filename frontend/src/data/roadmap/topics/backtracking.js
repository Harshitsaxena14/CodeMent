const backtracking = {
  id: 13,
  topicId: "backtracking",
  title: "Backtracking",
  description: "Learn state space searches, DFS decision trees, combinations generation, permutations, and grid traversals.",
  estimatedTime: "6 Hours",
  difficulty: "Hard",
  prerequisites: ["recursion", "basics"],
  learningObjectives: [
    "Build decision state trees to generate permutations or subsets",
    "Backtrack state variable changes after recursive returns to restore previous states"
  ],
  concepts: ["DFS Decision Tree", "State Restoration", "Subsets & Combinations"],
  modules: [
    {
      id: "mod-backtracking-basics",
      title: "State Space Searches & Subsets",
      order: 1,
      shortDescription: "Generate combinations and traverse decision trees.",
      estimatedTime: "180 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-backtracking-subsets",
          title: "Subsets Generation",
          learningObjective: "Generate all possible subset combinations in O(2^N) time using decision trees.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Backtracking is a DFS-based search strategy. At each step, make a decision (e.g. include an element), recurse down that path, and then undo that decision (backtrack) to evaluate alternative paths. This systematically traverses the entire state space.",
          implementationTipsPlaceholder: [
            "Pass reference lists dynamically, but copy the subset state before pushing it to final results",
            "Be sure to clean up (pop) state arrays after returning from recursive branches"
          ],
          commonMistakesPlaceholder: [
            "Failing to copy arrays before saving results, storing empty references.",
            "Omitting loop indices, causing duplicate or infinite recursion states."
          ],
          linkedPracticeProblems: [
            {
              id: 1301,
              title: "Subsets",
              difficulty: "Medium",
              pattern: "Backtracking DFS",
              link: "https://leetcode.com/problems/subsets/"
            },
            {
              id: 1302,
              title: "Permutations",
              difficulty: "Medium",
              pattern: "Backtracking DFS",
              link: "https://leetcode.com/problems/permutations/"
            },
            {
              id: 1303,
              title: "N-Queens",
              difficulty: "Hard",
              pattern: "Backtracking Board",
              link: "https://leetcode.com/problems/n-queens/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default backtracking;
