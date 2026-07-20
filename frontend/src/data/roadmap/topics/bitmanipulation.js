const bitmanipulation = {
  id: 17,
  topicId: "bitmanipulation",
  title: "Bit Manipulation",
  description: "Learn bitwise operations (&, |, ^, ~, <<, >>), bitwise arithmetic, and masking strategies to write memory-efficient algorithms.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: [
    "Manipulate integers at the binary bit layer using logical operations",
    "Apply XOR characteristics to isolate unique keys in collections"
  ],
  concepts: ["Bitwise Operations", "Bit Masking", "XOR Properties"],
  modules: [
    {
      id: "mod-bitmanipulation-operators",
      title: "Bitwise Operations & Masks",
      order: 1,
      shortDescription: "Modify binary bits to evaluate properties in O(1) time.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-bitmanipulation-xor",
          title: "XOR Unique Keys",
          learningObjective: "Isolate unique elements in lists using XOR cancellation properties in O(N) time and O(1) space.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Bitwise XOR (^) yields 1 if bits differ, and 0 if they match. XORing a value with itself yields 0 (X ^ X = 0), and XORing with 0 preserves the value (X ^ 0 = X). Consequently, XORing all elements in an array cancels out duplicates, leaving only the unique element.",
          implementationTipsPlaceholder: [
            "Initialize an accumulator variable as 0 before looping through array elements",
            "Use bitwise shifting (1 << i) to isolate specific bit indexes"
          ],
          commonMistakesPlaceholder: [
            "Confusing the logical OR operator (|) with the XOR operator (^).",
            "Failing to handle arithmetic overflow boundaries on large bit shifts."
          ],
          linkedPracticeProblems: [
            {
              id: 1701,
              title: "Single Number",
              difficulty: "Easy",
              pattern: "Bitwise XOR",
              link: "https://leetcode.com/problems/single-number/"
            },
            {
              id: 1702,
              title: "Number of 1 Bits",
              difficulty: "Easy",
              pattern: "Bit Manipulation",
              link: "https://leetcode.com/problems/number-of-1-bits/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default bitmanipulation;
