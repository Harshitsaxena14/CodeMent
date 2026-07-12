const dp = {
  id: 21,
  topicId: "dp",
  title: "Dynamic Programming",
  description: "Optimization through overlapping subproblem caches. Master tabulation, memoization, and knapsack grids.",
  estimatedTime: "10 Hours",
  difficulty: "Hard",
  prerequisites: ["recursion"],
  learningObjectives: ["Map overlapping recursive steps", "Build bottom-up tabulation tables"],
  modules: [
    {
      id: "mod-dp-concepts",
      title: "Memoization vs Tabulation",
      order: 1,
      shortDescription: "Fundamentals of recursion cache states.",
      estimatedTime: "90 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-dp-memo",
          title: "Recursive Memoization Caches",
          learningObjective: "Store intermediate recurrence results to skip redundant subproblem checks.",
          estimatedDuration: "35 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Map state parameters to grid array columns or hash values. Query cache before calculating recursively.",
          implementationTipsPlaceholder: ["Initialize cache indexes with uncalculated flags (e.g. -1)"],
          commonMistakesPlaceholder: ["Forgetting boundaries base conditions leading to infinite recurrences loops"],
          linkedPracticeProblems: [
            { id: "dp1", title: "Coin Change", difficulty: "Medium", pattern: "DP Memoization", link: "https://leetcode.com/problems/coin-change/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default dp;
