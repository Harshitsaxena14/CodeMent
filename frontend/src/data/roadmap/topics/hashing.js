const hashing = {
  id: 9,
  topicId: "hashing",
  title: "Hashing",
  description: "Key-value indexing structures. Crucial for reducing search time complexities from linear O(N) to constant O(1).",
  estimatedTime: "3 Hours",
  difficulty: "Easy",
  prerequisites: ["arrays"],
  learningObjectives: ["HashMap mappings", "Collision resolution"],
  modules: [
    {
      id: "mod-hashing-ops",
      title: "Hash Tables & Collisions",
      order: 1,
      shortDescription: "Fundamentals of hash buckets and key mappings.",
      estimatedTime: "60 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-hashing-buckets",
          title: "Hash Mappings and Buckets",
          learningObjective: "Understand direct mapping index arrays and collision resolutions.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Map keys to index values using modular functions. Resolve collisions using chaining or linear probing.",
          implementationTipsPlaceholder: ["Ensure hash functions yield uniform distribution"],
          commonMistakesPlaceholder: ["Forgetting negative hash value outputs conversion"],
          linkedPracticeProblems: [
            { id: "h1", title: "Contains Duplicate", difficulty: "Easy", pattern: "HashMap", link: "https://leetcode.com/problems/contains-duplicate/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default hashing;
