const prefixsum = {
  id: 15,
  topicId: "prefix-sum",
  title: "Prefix Sum",
  description: "Dynamic array slice accumulation indices. Resolve contiguous range query sums in constant O(1) runtime.",
  estimatedTime: "3 Hours",
  difficulty: "Easy",
  prerequisites: ["arrays"],
  learningObjectives: ["Understand slice summation grids", "Track range queries in O(1) time"],
  modules: [
    {
      id: "mod-prefixsum-queries",
      title: "Range Sum Indices Queries",
      order: 1,
      shortDescription: "Precompute prefix sum arrays to answer query offsets.",
      estimatedTime: "45 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-prefixsum-basics",
          title: "Prefix Sum Array Precomputation",
          learningObjective: "Build helper grids to subtract index sums in O(1) time.",
          estimatedDuration: "20 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Compute prefix[i] = prefix[i-1] + nums[i-1]. Range sum [L, R] = prefix[R+1] - prefix[L].",
          implementationTipsPlaceholder: ["Use a 1-based indexing scheme to handle L=0 base cases"],
          commonMistakesPlaceholder: ["Off-by-one errors mapping boundary indices offsets"],
          linkedPracticeProblems: [
            { id: "ps1", title: "Range Sum Query - Immutable", difficulty: "Easy", pattern: "Prefix Sum", link: "https://leetcode.com/problems/range-sum-query-immutable/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default prefixsum;
