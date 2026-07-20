const twopointer = {
  id: 14,
  topicId: "twopointer",
  title: "Two Pointers",
  description: "Converge or shift separate pointer indices to evaluate sorted ranges and partition arrays in-place.",
  estimatedTime: "5 Hours",
  difficulty: "Easy",
  prerequisites: ["arrays"],
  learningObjectives: [
    "Search elements in sorted arrays by converging left/right boundary indexes",
    "Identify cycle structures using slow and fast traversal pointers"
  ],
  concepts: ["Boundary Convergence", "Fast-Slow Pointers", "In-place Swaps"],
  modules: [
    {
      id: "mod-twopointer-basics",
      title: "Sorted Array Lookups",
      order: 1,
      shortDescription: "Narrow down sorted search spaces dynamically by moving outer bounds.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-twopointer-convergence",
          title: "Pointer Convergence",
          learningObjective: "Search for target sum pairs in sorted arrays in linear O(N) runtime.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Pointer convergence operates on sorted arrays. By placing one pointer at the start (0) and another at the end (N-1), we compare their sum to a target. If sum < target, increment left pointer to increase the sum. If sum > target, decrement right pointer. This eliminates irrelevant options at each step, yielding O(N) runtime.",
          implementationTipsPlaceholder: [
            "Ensure elements are sorted before running convergence checks",
            "Use inequality 'left < right' to control loop bounds cleanly"
          ],
          commonMistakesPlaceholder: [
            "Mutating pointers incorrectly, causing infinite loops.",
            "Applying convergence on unsorted array inputs."
          ],
          linkedPracticeProblems: [
            {
              id: 1401,
              title: "Two Sum II - Sorted",
              difficulty: "Easy",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
            },
            {
              id: 1402,
              title: "3Sum",
              difficulty: "Medium",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/3sum/"
            },
            {
              id: 1403,
              title: "Trapping Rain Water",
              difficulty: "Hard",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/trapping-rain-water/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default twopointer;
