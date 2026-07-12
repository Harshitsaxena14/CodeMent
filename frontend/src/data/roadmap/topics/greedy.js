const greedy = {
  id: 16,
  topicId: "greedy",
  title: "Greedy",
  description: "Locally optimal choice logic. Trace interval sorting, elements matching, and greedy proof heuristics.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: ["Identify locally optimal choice criteria", "Trace interval sequences"],
  modules: [
    {
      id: "mod-greedy-intervals",
      title: "Interval Schedules optimizations",
      order: 1,
      shortDescription: "Order intervals based on endpoint metrics.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-greedy-intervals-sorting",
          title: "Interval Endpoint Ordering",
          learningObjective: "Maximize scheduling density by selecting shortest endpoint options.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Sort intervals by end bounds. Select non-overlapping segments sequentially.",
          implementationTipsPlaceholder: ["Use comparison sorts on interval coordinates arrays"],
          commonMistakesPlaceholder: ["Sorting by start bounds instead of end bounds"],
          linkedPracticeProblems: [
            { id: "gr1", title: "Non-overlapping Intervals", difficulty: "Medium", pattern: "Greedy", link: "https://leetcode.com/problems/non-overlapping-intervals/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default greedy;
