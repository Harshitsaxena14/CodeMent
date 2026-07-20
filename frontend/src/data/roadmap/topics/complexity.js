const complexity = {
  id: 27,
  topicId: "complexity",
  title: "Complexity Analysis",
  description: "Evaluate asymptotic space-time limits of programs using Big O, Big Omega, and Theta notations.",
  estimatedTime: "2 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: [
    "Analyze code loops to determine O(N) runtime scaling",
    "Identify call stack frame overheads in space complexity"
  ],
  concepts: ["Time Complexity", "Space Complexity", "Big O Notations"],
  modules: [
    {
      id: "mod-complexity-big-o",
      title: "Asymptotic Analysis",
      order: 1,
      shortDescription: "Evaluate code scaling behavior under worst-case inputs.",
      estimatedTime: "60 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-complexity-loops",
          title: "Loop Cost Evaluations",
          learningObjective: "Inspect single and nested loop blocks to calculate dominant polynomial terms.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Asymptotic complexity evaluates execution time or auxiliary space scaling relative to input size N. Big O describes the worst-case ceiling. A single loop over N elements runs in O(N), while nested loops typically yield O(N^2). Logarithmic limits O(log N) arise when search spaces are halved at each step, e.g., in binary search.",
          implementationTipsPlaceholder: [
            "Identify the fastest-growing term and drop constant modifiers",
            "Evaluate variable-length nested loops carefully by summing progression ranges"
          ],
          commonMistakesPlaceholder: [
            "Failing to account for auxiliary objects or recursion frames in space limits.",
            "Confusing constant limits O(1) with linear counts when limits are fixed but very large."
          ],
          linkedPracticeProblems: [
            {
              id: 2701,
              title: "Fibonacci Number",
              difficulty: "Easy",
              pattern: "Recursive Complexity",
              link: "https://leetcode.com/problems/fibonacci-number/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default complexity;
