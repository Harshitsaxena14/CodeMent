const bitmanipulation = {
  id: 17,
  topicId: "bit-manipulation",
  title: "Bit Manipulation",
  description: "Binary bitwise operations logic. Master bit shifts, masks filters, and bitwise arithmetic bounds.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: ["Understand XOR identities", "Build bit masks filters"],
  modules: [
    {
      id: "mod-bitwise-ops",
      title: "Bitwise Operators",
      order: 1,
      shortDescription: "Bitwise AND, OR, XOR operations logic.",
      estimatedTime: "45 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-bitwise-xor",
          title: "XOR Cancelation properties",
          learningObjective: "Leverage XOR cancelation identities to solve duplicate keys lookups.",
          estimatedDuration: "20 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "x ^ x = 0. x ^ 0 = x. Bitwise XOR cancels identical pairs.",
          implementationTipsPlaceholder: ["Use bitwise shifting to extract target bits"],
          commonMistakesPlaceholder: ["Forgetting operator precedence order rules"],
          linkedPracticeProblems: [
            { id: "bm1", title: "Single Number", difficulty: "Easy", pattern: "Bitwise XOR", link: "https://leetcode.com/problems/single-number/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default bitmanipulation;
