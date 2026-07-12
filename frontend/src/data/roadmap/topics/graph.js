const graph = {
  id: 8,
  topicId: "graph",
  title: "Graphs",
  description: "Connected node networks. Master topological dependencies, cycle validation, and shortest path weights.",
  estimatedTime: "8 Hours",
  difficulty: "Hard",
  prerequisites: ["tree"],
  learningObjectives: [
    "Verify cycles inside directed paths",
    "Trace Dijkstra's shortest weights"
  ],
  concepts: ["Representations", "Cycle Detection", "Topological Sort", "Dijkstra's Algorithm"],
  modules: [
    {
      id: "mod-graph-cycle",
      title: "Cycle Verification",
      order: 1,
      shortDescription: "Check paths loops to prevent infinite recurrence boundaries.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-graph-cycle-check",
          title: "Graph Loop detection",
          learningObjective: "Detect cycle dependencies using node colors or recursion check sets.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Traverse graphs using DFS. Check if scanner hits an active recursion stack node frame.",
          implementationTipsPlaceholder: ["Keep track of visited node indexes inside arrays"],
          commonMistakesPlaceholder: ["Forgetting to clear active path markers during backtracking steps"],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Number of Islands",
              difficulty: "Medium",
              pattern: "DFS Grid",
              link: "https://leetcode.com/problems/number-of-islands/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default graph;
