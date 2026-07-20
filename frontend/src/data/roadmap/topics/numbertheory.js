const numbertheory = {
  id: 25,
  topicId: "numbertheory",
  title: "Number Theory",
  description: "Learn modular arithmetic, GCD (Euclidean), prime factorization, and prime generation sieve models.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: [
    "Generate primes up to limit N in O(N log log N) time using Sieve of Eratosthenes",
    "Calculate Greatest Common Divisors recursively in logarithmic O(log min(A, B)) time"
  ],
  concepts: ["Sieve of Eratosthenes", "Euclidean GCD", "Modular Exponentiation"],
  modules: [
    {
      id: "mod-numbertheory-basics",
      title: "Prime Numbers & GCD",
      order: 1,
      shortDescription: "Calculate mathematical boundaries and divisors.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-numbertheory-sieve",
          title: "Prime Sieve & Divisors",
          learningObjective: "Generate all primes up to N in O(N log log N) time using Eratosthenes Sieve.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "The Sieve of Eratosthenes generates primes up to N. Maintain a boolean array. Start at index 2, and mark all its multiples as composite. Move to the next prime, and mark its multiples. Stop when the index exceeds sqrt(N). The remaining unmarked indices are prime.",
          implementationTipsPlaceholder: [
            "Initialize the composite array up to index N + 1",
            "Optimize loops by starting composite marks at i * i"
          ],
          commonMistakesPlaceholder: [
            "Iterating past sqrt(N) inside composite marking loops, causing duplicate checks.",
            "Incorrectly handle base values 0 and 1, which are non-prime."
          ],
          linkedPracticeProblems: [
            {
              id: 2501,
              title: "Count Primes",
              difficulty: "Medium",
              pattern: "Sieve Eratosthenes",
              link: "https://leetcode.com/problems/count-primes/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default numbertheory;
