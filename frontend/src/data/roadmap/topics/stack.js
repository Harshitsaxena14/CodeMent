const stack = {
  id: 5,
  topicId: "stack",
  title: "Stacks",
  description: "LIFO sequence controls. Master parenthetical matching, evaluation offsets, and monotonic filters.",
  estimatedTime: "3 Hours",
  difficulty: "Medium",
  prerequisites: ["arrays"],
  learningObjectives: [
    "Manage LIFO order constraints",
    "Identify monotonic bounds conditions"
  ],
  concepts: ["LIFO Operations", "Monotonic Stack", "Expression Parsing"],
  modules: [
    {
      id: "mod-stack-matching",
      title: "Monotonic Ranges",
      order: 1,
      shortDescription: "Evaluate sequence conditions using monotonic parameters.",
      estimatedTime: "40 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-stack-monotonic",
          title: "Monotonic Elements Sorting",
          learningObjective: "Filter elements in increasing/decreasing sequence order dynamically.",
          estimatedDuration: "20 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Prune elements from stack top whenever the current scanner element violates order requirements.",
          implementationTipsPlaceholder: ["Push array index coordinates onto the stack instead of raw value elements"],
          commonMistakesPlaceholder: ["Forgetting boundaries loops on empty stack buffers"],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Valid Parentheses",
              difficulty: "Easy",
              pattern: "Stack Matching",
              link: "https://leetcode.com/problems/valid-parentheses/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default stack;
