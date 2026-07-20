const trie = {
  id: 20,
  topicId: "trie",
  title: "Trie",
  description: "Prefix tree structures for dictionary searches, autocomplete engines, and prefix matching.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["tree"],
  learningObjectives: [
    "Construct retrieval prefix trees (Tries) supporting insertions and searches",
    "Identify word components matching partial string search parameters"
  ],
  concepts: ["Prefix Search", "Trie Node Class", "Character Indexing Map"],
  modules: [
    {
      id: "mod-trie-basics",
      title: "Prefix Mapping Structures",
      order: 1,
      shortDescription: "Build dynamic character child maps to parse strings character by character.",
      estimatedTime: "120 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-trie-insert",
          title: "Trie Node Management",
          learningObjective: "Write a complete Trie supporting insert, search, and startsWith operations in O(L) length complexity.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "A Trie (Prefix Tree) is an ordered tree data structure used to store strings. Each node represents a single character, with branching arrays of children representing the next characters. A boolean flag tracks the end of a valid word, enabling fast prefix match lookups.",
          implementationTipsPlaceholder: [
            "Use child character indices like 'char.charCodeAt(0) - 97' for O(1) letter queries",
            "Store a boolean 'isEndOfWord' flag at nodes to distinguish complete words from prefixes"
          ],
          commonMistakesPlaceholder: [
            "Forgetting to initialize child arrays, raising null pointer errors during tree descent.",
            "Incorrectly flagging partial prefixes as matching entire words."
          ],
          linkedPracticeProblems: [
            {
              id: 2001,
              title: "Implement Trie (Prefix Tree)",
              difficulty: "Medium",
              pattern: "Trie Structure",
              link: "https://leetcode.com/problems/implement-trie-prefix-tree/"
            },
            {
              id: 2002,
              title: "Design Add and Search Words Data Structure",
              difficulty: "Medium",
              pattern: "Trie DFS",
              link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default trie;
