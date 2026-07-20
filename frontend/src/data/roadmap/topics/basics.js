const basics = {
  id: 1,
  topicId: "basics",
  title: "Basics",
  description: "Core programming structures, variables, condition controls, and basic functional iterations.",
  estimatedTime: "3 Hours",
  difficulty: "Easy",
  prerequisites: [],
  learningObjectives: [
    "Identify loop conditions and termination states",
    "Evaluate standard branching parameters (if/else checks)"
  ],
  concepts: ["Variables", "Loops", "Branching Controls"],
  modules: [
    {
      id: "mod-basics-loops",
      title: "Branching and Loops",
      order: 1,
      shortDescription: "Master control structures and repeating loop execution layers.",
      estimatedTime: "90 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-basics-iterations",
          title: "Loop Iterations",
          learningObjective: "Write structured loops (for, while) with clear initialization, criteria, and increment boundaries.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Loops are control structures used to repeat execution blocks. A standard 'for' loop initializes a counter, validates a condition, and mutates indices after each iteration, whereas a 'while' loop executes until a condition is falsy. Mastering loop boundaries prevents infinite runs and off-by-one index exceptions.",
          implementationTipsPlaceholder: [
            "Always verify loop increment steps",
            "Keep variable declarations outside loop scopes when possible"
          ],
          commonMistakesPlaceholder: [
            "Writing loops without increments, leading to hung CPU processes.",
            "Off-by-one errors due to inequality markers (< vs <=)."
          ],
          linkedPracticeProblems: [
            {
              id: 101,
              title: "Fizz Buzz",
              difficulty: "Easy",
              pattern: "Conditional Branches",
              link: "https://leetcode.com/problems/fizz-buzz/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default basics;
