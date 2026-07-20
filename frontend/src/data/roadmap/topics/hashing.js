const hashing = {
  id: 9,
  topicId: "hashing",
  title: "Hashing",
  description: "Learn hash table insertions, collision resolution, constant time O(1) searches, and frequency tracking.",
  estimatedTime: "4 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: [
    "Perform search and insert operations in O(1) average time complexity",
    "Identify subarray sums matching target checks using prefix sums stored in HashMaps"
  ],
  concepts: ["Hash Table", "HashSet", "HashMap Lookup"],
  modules: [
    {
      id: "mod-hashing-lookups",
      title: "HashMap Traversal & Complements",
      order: 1,
      shortDescription: "Master constant-time key-value mapping to solve linear search queries.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-hashing-twosum",
          title: "HashMap Target Complements",
          learningObjective: "Identify index pairs matching target sum using HashMaps in O(N) runtime.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Hash maps store values mapped to unique keys, enabling average O(1) searches. In target sum problems, instead of checking all pairs O(N^2), scan each element and search the hash map for its complement (target - current). If found, return the pair. If not, record the current element and its index in the map. This tracks history in one pass.",
          implementationTipsPlaceholder: [
            "Validate key existence in the map before retrieving index values",
            "Store complements as keys for fast lookup indexing"
          ],
          commonMistakesPlaceholder: [
            "Re-using the same element twice (e.g. index mapping targets itself).",
            "Failing to handle hash collisions under non-optimal hashing models."
          ],
          linkedPracticeProblems: [
            {
              id: 901,
              title: "Two Sum",
              difficulty: "Easy",
              pattern: "HashMap Lookup",
              link: "https://leetcode.com/problems/two-sum/"
            },
            {
              id: 902,
              title: "Subarray Sum Equals K",
              difficulty: "Medium",
              pattern: "Prefix HashMap",
              link: "https://leetcode.com/problems/subarray-sum-equals-k/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default hashing;
