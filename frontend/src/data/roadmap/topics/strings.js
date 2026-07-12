const strings = {
  id: 3,
  topicId: "strings",
  title: "Strings",
  description: "Character sequences matching array operations. Master frequency mapping, pattern indices, and sliding boundaries.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["arrays"],
  learningObjectives: [
    "Build character index code counters",
    "Identify window offsets constraints"
  ],
  concepts: ["Hashing", "Two Pointer", "Pattern Matching"],
  modules: [
    {
      id: "mod-strings-anagrams",
      title: "Anagram Patterns",
      order: 1,
      shortDescription: "Validate string character counts in linear space-time limits.",
      estimatedTime: "40 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-strings-freq-mapping",
          title: "Frequency Counters",
          learningObjective: "Compare letters distribution arrays to solve sequence matching.",
          estimatedDuration: "20 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Map character codes to standard array offset grids to resolve occurrences counts in O(N) runtime.",
          implementationTipsPlaceholder: ["Convert indices as: code - 97"],
          commonMistakesPlaceholder: ["Omission of string length matching early checks"],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Valid Anagram",
              difficulty: "Easy",
              pattern: "HashMap",
              link: "https://leetcode.com/problems/valid-anagram/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default strings;
