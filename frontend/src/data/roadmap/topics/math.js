const math = {
  id: 26,
  topicId: "math",
  title: "Math & Geometry",
  description: "Learn fast exponentiation, matrix multiplications, basic combinations (nCr), and geometric coordinate sweeps.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: [
    "Compute dynamic powers (x^n) in logarithmic O(log N) runtime using binary exponentiation",
    "Identify geometric coordinate alignments using cross-product direction parameters"
  ],
  concepts: ["Binary Exponentiation", "Matrix Operations", "Geometric Sweep Line"],
  modules: [
    {
      id: "mod-math-basics",
      title: "Binary Arithmetic & Powers",
      order: 1,
      shortDescription: "Optimize arithmetic iterations using binary index splits.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-math-pow",
          title: "Fast Exponentiation",
          learningObjective: "Compute x^n in O(log N) time.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Binary exponentiation (divide-and-conquer) computes x^n. If n is even, evaluate x^n = (x^2)^(n/2). If n is odd, evaluate x^n = x * x^(n-1). This reduces multiplications from linear O(N) to logarithmic O(log N).",
          implementationTipsPlaceholder: [
            "Handle negative exponents carefully by taking reciprocal 1/x and using positive n",
            "Be aware of integer overflow bounds when n = -2^31"
          ],
          commonMistakesPlaceholder: [
            "Stack overflow errors caused by omitting base case checks when n = 0.",
            "Arithmetic overflow when squaring x repeatedly."
          ],
          linkedPracticeProblems: [
            {
              id: 2601,
              title: "Pow(x, n)",
              difficulty: "Medium",
              pattern: "Binary Exponentiation",
              link: "https://leetcode.com/problems/powx-n/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default math;
