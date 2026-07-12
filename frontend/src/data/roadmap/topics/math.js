const math = {
  id: 26,
  topicId: "math",
  title: "Math for DSA",
  description: "Combinatorial principles, matrix operations, and probability equations. Master combinations, permutations, and exponentiation calculations.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: ["Understand combinatorial counts formulas", "Compute fast exponentiation values"],
  modules: [
    {
      id: "mod-math-exponentiation",
      title: "Binary Exponentiation",
      order: 1,
      shortDescription: "Calculate power operations in logarithmic time O(log N).",
      estimatedTime: "45 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-fast-exp",
          title: "Binary Power Splits",
          learningObjective: "Evaluate pow(x, n) iteratively in O(log n) time.",
          estimatedDuration: "20 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Divide n by 2 recursively. Square base variable x dynamically, accounting for odd exponents.",
          implementationTipsPlaceholder: ["Use bitwise right shift 'n = n >> 1' for divisions"],
          commonMistakesPlaceholder: ["Forgetting to handle negative exponent values properly"],
          linkedPracticeProblems: [
            { id: "m1", title: "Pow(x, n)", difficulty: "Medium", pattern: "Fast Exponentiation", link: "https://leetcode.com/problems/powx-n/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default math;
