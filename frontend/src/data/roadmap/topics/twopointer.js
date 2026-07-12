const twopointer = {
  id: 14,
  topicId: "two-pointer",
  title: "Two Pointer",
  description: "Converge or coordinate array scan markers to solve lookup loops in linear execution times.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["arrays"],
  learningObjectives: ["Understand sorted pointer bounds", "Track dynamic indices swaps"],
  modules: [
    {
      id: "mod-twopointer-scans",
      title: "Index Pointer Convergence",
      order: 1,
      shortDescription: "Move markers inward from opposite endpoints to locate sums.",
      estimatedTime: "45 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-twopointer-bounds",
          title: "Pointer Convergence",
          learningObjective: "Locate indices matching target sum constraints.",
          estimatedDuration: "20 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Maintain left and right boundary variables. Advance or retreat them based on comparisons.",
          implementationTipsPlaceholder: ["Use condition left < right"],
          commonMistakesPlaceholder: ["Omitting boundaries advances leading to infinite check loops"],
          linkedPracticeProblems: [
            { id: "tp1", title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", pattern: "Two Pointer", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default twopointer;
