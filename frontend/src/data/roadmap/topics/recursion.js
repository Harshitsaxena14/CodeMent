const recursion = {
  id: 11,
  topicId: "recursion",
  title: "Recursion",
  description: "Functional self-invocation loops. Trace call stacks, recurrence trees, and parameters states accumulation.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: ["Identify recursion base cases", "Evaluate call stack bounds"],
  modules: [
    {
      id: "mod-recursion-fundamentals",
      title: "Self-invocation stacks",
      order: 1,
      shortDescription: "Fundamentals of tracking recurrence bounds.",
      estimatedTime: "60 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-recursion-basecase",
          title: "Base Case Resolution",
          learningObjective: "Write clean terminate conditions to halt stack frame accumulation.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Identify smallest subproblem values. Exit recursion stack frames early.",
          implementationTipsPlaceholder: ["Ensure parameters converge toward base cases"],
          commonMistakesPlaceholder: ["Omitting base conditions causing stack overflows"],
          linkedPracticeProblems: [
            { id: "rec1", title: "Fibonacci Number", difficulty: "Easy", pattern: "Recursion", link: "https://leetcode.com/problems/fibonacci-number/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default recursion;
