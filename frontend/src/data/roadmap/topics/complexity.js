const complexity = {
  id: 27,
  topicId: "complexity",
  title: "Time & Space Complexity",
  description: "Asymptotic notation bounds analysis. Master Big-O notation, Big-Omega, Big-Theta, recursion tree formulas, and aux space tracing.",
  estimatedTime: "2 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: ["Analyze time growth bounds", "Trace auxiliary space usages"],
  modules: [
    {
      id: "mod-complexity-asymptotic",
      title: "Asymptotic Notation Bounds",
      order: 1,
      shortDescription: "Fundamentals of worst-case runtime boundaries.",
      estimatedTime: "60 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-complexity-bigo",
          title: "Big-O Analysis Rules",
          learningObjective: "Write clean time complexity equations for loops and branches.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Analyze statement iteration growth rates. Drop lower-order polynomial terms and coefficient factors.",
          implementationTipsPlaceholder: ["Focus on input size N scaling trends"],
          commonMistakesPlaceholder: ["Confusing auxiliary space bounds with complete memory consumption specs"],
          linkedPracticeProblems: [],
          completionState: false
        }
      ]
    }
  ]
};

export default complexity;
