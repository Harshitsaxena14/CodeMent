const binarysearch = {
  id: 10,
  topicId: "binary-search",
  title: "Binary Search",
  description: "Logarithmic lookup mechanism inside ordered ranges. Solve non-trivial bounds searches and search-space cuts.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: ["Understand search space cuts", "Identify search limits"],
  modules: [
    {
      id: "mod-bs-basics",
      title: "Binary Range Splits",
      order: 1,
      shortDescription: "Divide search space in half dynamically to find elements.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-bs-split",
          title: "Interval Splits Logic",
          learningObjective: "Locate values within sorted bounds in logarithmic complexity O(log N).",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Compute mid coordinate index. Shift left or right bounds pointers based on value comparison results.",
          implementationTipsPlaceholder: ["Use 'mid = left + Math.floor((right - left) / 2)' to avoid integer overflow"],
          commonMistakesPlaceholder: ["Writing boundary conditions causing infinite loops ('left <= right' mismatch)"],
          linkedPracticeProblems: [
            { id: "bs1", title: "Search in Rotated Sorted Array", difficulty: "Medium", pattern: "Binary Search", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default binarysearch;
