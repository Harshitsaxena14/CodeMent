const basics = {
  id: 1,
  topicId: "basics",
  title: "Basics",
  description: "Introduction to algorithmic thinking, complexity analysis, and control loops.",
  estimatedTime: "2 Hours",
  difficulty: "Easy",
  prerequisites: [],
  learningObjectives: [
    "Understand Big O complexity constraints",
    "Identify recursion stack properties"
  ],
  concepts: ["Time Complexity", "Space Complexity", "Loops", "Recursion Basics"],
  modules: [
    {
      id: "mod-basics-complexity",
      title: "Complexity Analysis",
      order: 1,
      shortDescription: "Evaluate space-time resource boundaries of programs.",
      estimatedTime: "45 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-basics-big-o",
          title: "Big O Complexity Analysis",
          learningObjective: "Analyze the runtime and memory footprints of standard loops and iterations.",
          estimatedDuration: "20 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Big O represents the asymptotic upper bound of algorithms in worst-case runtime paths.",
          implementationTipsPlaceholder: ["Focus on finding dominant nested loop nesting counts"],
          commonMistakesPlaceholder: ["Forgetting that recursion consumes call stack memory frames"],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Print 1 to N without loops",
              difficulty: "Easy",
              pattern: "Recursion",
              link: "https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops3621/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default basics;
