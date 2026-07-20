const stack = {
  id: 5,
  topicId: "stack",
  title: "Stacks",
  description: "LIFO (Last-In-First-Out) linear collections. Master bracket validation, monotonic stack optimizations, and expressions parsing.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["arrays"],
  learningObjectives: [
    "Execute LIFO operations to validate nesting parameters (e.g. parenthesis checks)",
    "Apply Monotonic Stack strategies to search for subsequent larger values in linear O(N) runtime"
  ],
  concepts: ["LIFO Operations", "Monotonic Stack", "Expression Parsing"],
  modules: [
    {
      id: "mod-stack-nested",
      title: "Parenthesis & Nesting Validation",
      order: 1,
      shortDescription: "Track scopes and pairings using LIFO pushes and pops.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-stack-brackets",
          title: "Bracket Nesting",
          learningObjective: "Validate balanced brackets sequences in O(N) time and space.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Stacks operate on a Last-In, First-Out (LIFO) model. To validate matching brackets, push opening brackets onto the stack. When meeting a closing bracket, pop the top element and verify if they match. If they match, continue. If not (or if stack is empty), the string is invalid. The stack must be empty at the end.",
          implementationTipsPlaceholder: [
            "Use a hash map to map closing brackets to their corresponding opening symbols",
            "Always check that the stack is non-empty before calling pop operations"
          ],
          commonMistakesPlaceholder: [
            "Accessing pop elements on empty stacks, causing null/index exceptions.",
            "Forgetting to verify if the stack is completely empty after loop completion."
          ],
          linkedPracticeProblems: [
            {
              id: 501,
              title: "Valid Parentheses",
              difficulty: "Easy",
              pattern: "LIFO Stack",
              link: "https://leetcode.com/problems/valid-parentheses/"
            },
            {
              id: 502,
              title: "Next Greater Element I",
              difficulty: "Easy",
              pattern: "Monotonic Stack",
              link: "https://leetcode.com/problems/next-greater-element-i/"
            },
            {
              id: 503,
              title: "Daily Temperatures",
              difficulty: "Medium",
              pattern: "Monotonic Stack",
              link: "https://leetcode.com/problems/daily-temperatures/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default stack;
