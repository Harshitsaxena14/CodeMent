const numbertheory = {
  id: 25,
  topicId: "number-theory",
  title: "Number Theory",
  description: "Divisibility, modular arithmetic, and prime validations. Master GCD algorithms, Sieve of Eratosthenes, and modular exponents.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: ["Verify prime values efficiently", "Trace Sieve loops"],
  modules: [
    {
      id: "mod-number-theory-primes",
      title: "Prime Index Mappings",
      order: 1,
      shortDescription: "Fundamentals of prime number filters.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-sieve-eratosthenes",
          title: "Sieve of Eratosthenes",
          learningObjective: "Generate all prime numbers up to boundary N in O(N log log N) complexity.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Create a boolean array. Mark multiples of prime inputs as composite indices recursively.",
          implementationTipsPlaceholder: ["Start marking multiples from index i * i instead of 2 * i"],
          commonMistakesPlaceholder: ["OutOfBounds index bounds allocations on large limit variables"],
          linkedPracticeProblems: [
            { id: "nt1", title: "Count Primes", difficulty: "Medium", pattern: "Number Theory", link: "https://leetcode.com/problems/count-primes/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default numbertheory;
