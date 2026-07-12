const trie = {
  id: 20,
  topicId: "trie",
  title: "Tries",
  description: "Prefix search trees tracking string sets. Master character node links mappings, insertion steps, and prefix lookups.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["tree"],
  learningObjectives: ["Manage character array node links mapping", "Perform prefix lookups"],
  modules: [
    {
      id: "mod-trie-ops",
      title: "Prefix Trees insertions",
      order: 1,
      shortDescription: "Insert and lookup words in linear duration limits.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-trie-insert",
          title: "Trie Node Mappings",
          learningObjective: "Insert strings character-by-character inside Trie maps.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Traverse Trie levels. Create new child nodes dynamically if they do not exist.",
          implementationTipsPlaceholder: ["Use a fixed-size node array children[26] mapping lowercase letters"],
          commonMistakesPlaceholder: ["Forgetting to set the end-of-word boolean marker flag to true on word completion"],
          linkedPracticeProblems: [
            { id: "tr1", title: "Implement Trie (Prefix Tree)", difficulty: "Medium", pattern: "Trie Design", link: "https://leetcode.com/problems/implement-trie-prefix-tree/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default trie;
