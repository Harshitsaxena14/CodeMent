const recursion = {
  id: 12,
  topicId: "recursion",
  title: "Recursion",
  description: "Learn recursive execution loops, base case criteria, call stack frames, and recursive trees.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: [
    "Formulate recursive base cases to guarantee program termination",
    "Identify call stack height footprints to calculate space complexity bounds"
  ],
  concepts: ["Base Case", "Call Stack Frames", "Divide and Conquer"],
  modules: [
    {
      id: "mod-recursion-basics",
      title: "Recursive Functions & Base Cases",
      order: 1,
      shortDescription: "Master function call stacks to execute nested calculations.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-recursion-factorial",
          title: "Recursion Stack Bounds",
          learningObjective: "Write clean recursive functions with reliable base case checks.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Recursion is a technique where a function calls itself to solve a smaller subproblem. Every recursive algorithm must define a base case (to terminate execution) and a recurrence relation (to step toward the base case). Each function call adds a frame to the call stack.",
          implementationTipsPlaceholder: [
            "Always write base case checks at the very top of the function body",
            "Be aware that recursion consumes space in the call stack, yielding O(H) space"
          ],
          commonMistakesPlaceholder: [
            "Omitting base cases, causing infinite recursions and Stack Overflow errors.",
            "Modifying reference parameters incorrectly across recursive branches."
          ],
          linkedPracticeProblems: [
            {
              id: 1201,
              title: "Fibonacci Number",
              difficulty: "Easy",
              pattern: "Recursive Stack",
              link: "https://leetcode.com/problems/fibonacci-number/"
            },
            {
              id: 1202,
              title: "Merge Two Sorted Lists",
              difficulty: "Easy",
              pattern: "Recursive Pointer",
              link: "https://leetcode.com/problems/merge-two-sorted-lists/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default recursion;
