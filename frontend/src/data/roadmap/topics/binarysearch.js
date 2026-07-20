const binarysearch = {
  id: 10,
  topicId: "binarysearch",
  title: "Binary Search",
  description: "Halve sorted search spaces recursively to find values, boundary conditions, or optimization thresholds in logarithmic time.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["arrays", "basics"],
  learningObjectives: [
    "Execute search lookups in sorted arrays in O(log N) runtime",
    "Identify optimal thresholds over numerical search spaces (Binary Search on Answer)"
  ],
  concepts: ["Sorted Search", "Search Space Division", "Binary Search on Answer"],
  modules: [
    {
      id: "mod-binarysearch-classic",
      title: "Logarithmic Search Lookups",
      order: 1,
      shortDescription: "Divide sorted search frames iteratively to find values or thresholds.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-binarysearch-lookup",
          title: "Sorted Array Search",
          learningObjective: "Locate elements in sorted arrays in logarithmic O(log N) time.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Binary Search divides a sorted search space in half at each step. Set low and high pointers. Compute mid index. If array[mid] matches target, return index. If array[mid] < target, shift low = mid + 1. Otherwise, shift high = mid - 1. This reduces search bounds exponentially, yielding O(log N) runtime.",
          implementationTipsPlaceholder: [
            "Use 'mid = low + Math.floor((high - low) / 2)' to prevent integer overflow errors",
            "Maintain condition 'low <= high' to process final singleton array bounds"
          ],
          commonMistakesPlaceholder: [
            "Infinite loops caused by failing to shift pointer bounds (mid + 1 or mid - 1).",
            "Applying binary search to unsorted inputs."
          ],
          linkedPracticeProblems: [
            {
              id: 1001,
              title: "Binary Search",
              difficulty: "Easy",
              pattern: "Binary Search",
              link: "https://leetcode.com/problems/binary-search/"
            },
            {
              id: 1002,
              title: "Search in Rotated Sorted Array",
              difficulty: "Medium",
              pattern: "Binary Search",
              link: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
            },
            {
              id: 1003,
              title: "Find First and Last Position of Element in Sorted Array",
              difficulty: "Medium",
              pattern: "Binary Search",
              link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default binarysearch;
