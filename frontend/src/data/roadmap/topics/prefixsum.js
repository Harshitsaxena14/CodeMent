const prefixsum = {
  id: 15,
  topicId: "prefixsum",
  title: "Prefix Sum",
  description: "Precompute running array accumulations to answer range sum queries in constant O(1) time.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["arrays"],
  learningObjectives: [
    "Precompute subarray running sums to execute range sum queries in O(1) time",
    "Apply difference array updates to perform range additions in O(1) time"
  ],
  concepts: ["Running Sums", "Range Sum Query", "Difference Array"],
  modules: [
    {
      id: "mod-prefixsum-basics",
      title: "Prefix Accumulations & Ranges",
      order: 1,
      shortDescription: "Calculate contiguous sums across array slices using precalculated indices.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-prefixsum-rsq",
          title: "Range Sum Queries",
          learningObjective: "Precompute prefix sum arrays to solve multi-query ranges in O(1) average time.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Prefix sums precalculate the running accumulation: Prefix[i] = Sum(Array[0...i]). To query range sum between indices [L, R] in O(1) time, evaluate the difference: Sum[L...R] = Prefix[R] - Prefix[L-1]. This eliminates loop scans, making it ideal for frequent range queries.",
          implementationTipsPlaceholder: [
            "Use 1-based indexing for the prefix array to simplify L = 0 index boundary checks",
            "Initialize prefix[0] as 0 to act as a clean subtractor"
          ],
          commonMistakesPlaceholder: [
            "Off-by-one errors when boundary checks for index subtractors fall below 0.",
            "Modifying the original array without handling query indices correctly."
          ],
          linkedPracticeProblems: [
            {
              id: 1501,
              title: "Range Sum Query - Immutable",
              difficulty: "Easy",
              pattern: "Prefix Sum",
              link: "https://leetcode.com/problems/range-sum-query-immutable/"
            },
            {
              id: 1502,
              title: "Subarray Sum Equals K",
              difficulty: "Medium",
              pattern: "Prefix HashMap",
              link: "https://leetcode.com/problems/subarray-sum-equals-k/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default prefixsum;
