const greedy = {
  id: 16,
  topicId: "greedy",
  title: "Greedy Algorithms",
  description: "Make locally optimal choices at each step to find global optimums. Master interval scheduling, activity selection, and gas station problems.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["basics", "sorting"],
  learningObjectives: [
    "Formulate greedy choice parameters to yield global optimums",
    "Identify sorting strategies that enable greedy optimization"
  ],
  concepts: ["Locally Optimal Choice", "Sorting & Intervals", "Activity Selection"],
  modules: [
    {
      id: "mod-greedy-intervals",
      title: "Interval & Scheduling Choices",
      order: 1,
      shortDescription: "Sort arrays to make optimal local selections.",
      estimatedTime: "120 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-greedy-activity",
          title: "Activity Scheduling",
          learningObjective: "Select maximum non-overlapping intervals in O(N log N) sorting time.",
          estimatedDuration: "30 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Greedy algorithms make the best local choice at each step, hoping it leads to a global optimum. For activity selection, sort intervals by end times. Iterate through them, always selecting the next activity that starts after the current one ends. Sorting guarantees that we free up the resource as early as possible.",
          implementationTipsPlaceholder: [
            "Always sort inputs before executing greedy checks: sorting is the backbone of greedy correctness",
            "Keep track of the end boundary of the last selected activity"
          ],
          commonMistakesPlaceholder: [
            "Failing to sort elements, rendering the greedy selection logic incorrect.",
            "Using greedy on subproblems that lack the greedy-choice property (which instead require DP)."
          ],
          linkedPracticeProblems: [
            {
              id: 1601,
              title: "Assign Cookies",
              difficulty: "Easy",
              pattern: "Greedy Sorting",
              link: "https://leetcode.com/problems/assign-cookies/"
            },
            {
              id: 1602,
              title: "Gas Station",
              difficulty: "Medium",
              pattern: "Greedy Accumulation",
              link: "https://leetcode.com/problems/gas-station/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default greedy;
