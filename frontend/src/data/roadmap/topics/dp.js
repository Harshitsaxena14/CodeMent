const dp = {
  id: 21,
  topicId: "dp",
  title: "Dynamic Programming",
  description: "Master recursive subproblem optimization. Optimize recursion by caching overlapping subproblems (Memoization) and building iterative DP tables (Tabulation).",
  estimatedTime: "8 Hours",
  difficulty: "Hard",
  prerequisites: ["recursion", "basics"],
  learningObjectives: [
    "Identify overlapping subproblems and optimal substructure parameters",
    "Transition recursive calculations to memoized arrays or tabulated index tables"
  ],
  concepts: ["Memoization (Top-Down)", "Tabulation (Bottom-Up)", "Knapsack & LCS"],
  modules: [
    {
      id: "mod-dp-linear",
      title: "One-Dimensional DP Optimization",
      order: 1,
      shortDescription: "Solve linear recurrence relations by caching intermediate values.",
      estimatedTime: "240 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-dp-memoization",
          title: "Top-down Cache & Tabulation",
          learningObjective: "Write memoized and tabulated state models to solve linear recurrences in O(N) time.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Dynamic Programming solves problems with overlapping subproblems and optimal substructures. Top-down DP (Memoization) uses recursion and caches results. Bottom-up DP (Tabulation) starts from base cases and fills an iterative table. This reduces exponential O(2^N) recursions to linear O(N).",
          implementationTipsPlaceholder: [
            "Start by writing a plain recursive relation, then add a cache lookup before evaluations",
            "Optimize space from O(N) to O(1) if calculations only depend on the last few states"
          ],
          commonMistakesPlaceholder: [
            "Failing to initialize caches, resulting in duplicate computations.",
            "Incorrectly mapping base case values in bottom-up DP table arrays."
          ],
          linkedPracticeProblems: [
            {
              id: 2101,
              title: "Climbing Stairs",
              difficulty: "Easy",
              pattern: "Linear DP",
              link: "https://leetcode.com/problems/climbing-stairs/"
            },
            {
              id: 2102,
              title: "Coin Change",
              difficulty: "Medium",
              pattern: "Knapsack DP",
              link: "https://leetcode.com/problems/coin-change/"
            }
          ],
          completionState: false
        }
      ]
    },
    {
      id: "mod-dp-sequences",
      title: "Sequence Alignment & Matrices",
      order: 2,
      shortDescription: "Solve two-dimensional DP matrices representing string sequences or grids.",
      estimatedTime: "240 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-dp-lcs",
          title: "Longest Common Subsequence",
          learningObjective: "Formulate O(M*N) matrix transformations to resolve sequence alignments.",
          estimatedDuration: "45 Mins",
          difficulty: "Hard",
          prerequisiteLessons: ["lesson-dp-memoization"],
          conciseExplanationPlaceholder: "Sequence DP analyzes relationships between two strings. Set up a 2D grid DP[i][j] representing states for String1[0...i] and String2[0...j]. If characters match, accumulate: DP[i][j] = 1 + DP[i-1][j-1]. If they mismatch, take the maximum of excluding either character: DP[i][j] = max(DP[i-1][j], DP[i][j-1]).",
          implementationTipsPlaceholder: [
            "Verify loop bounds: size dimensions should be (Length1 + 1) x (Length2 + 1)",
            "Initialize boundary rows and columns as 0 to act as clean base cases"
          ],
          commonMistakesPlaceholder: [
            "Mismatching string indices with DP table coordinates (off-by-one offsets).",
            "Failing to optimize space, causing memory limits to blow on large inputs."
          ],
          linkedPracticeProblems: [
            {
              id: 2103,
              title: "Longest Common Subsequence",
              difficulty: "Medium",
              pattern: "Matrix DP",
              link: "https://leetcode.com/problems/longest-common-subsequence/"
            },
            {
              id: 2104,
              title: "Edit Distance",
              difficulty: "Hard",
              pattern: "Matrix DP",
              link: "https://leetcode.com/problems/edit-distance/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default dp;
