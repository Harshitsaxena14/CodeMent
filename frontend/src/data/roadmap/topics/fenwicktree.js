const fenwicktree = {
  id: 23,
  topicId: "fenwicktree",
  title: "Fenwick Tree",
  description: "Binary Indexed Trees (BIT). Optimize prefix sums and dynamic range updates in logarithmic O(log N) runtime.",
  estimatedTime: "4 Hours",
  difficulty: "Hard",
  prerequisites: ["prefixsum", "basics"],
  learningObjectives: [
    "Execute cumulative prefix sum queries and point updates in O(log N) time",
    "Apply bitwise logic (i & -i) to navigate index parent trees"
  ],
  concepts: ["Binary Indexed Tree", "Bitwise Parent Navigation", "Point Updates"],
  modules: [
    {
      id: "mod-fenwicktree-basics",
      title: "Binary Indexed Trees",
      order: 1,
      shortDescription: "Navigate index ranges using bitwise parent updates.",
      estimatedTime: "120 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-fenwicktree-rsq",
          title: "Fenwick Point Updates",
          learningObjective: "Write a Fenwick Tree supporting prefix sums and updates in O(log N) time.",
          estimatedDuration: "35 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "A Fenwick Tree (Binary Indexed Tree) stores prefix sum accumulations at indices representing binary intervals. Index navigation utilizes bitwise logic: 'i & -i' isolates the lowest set bit. Adding this term advances to the next node for updates; subtracting it navigates to parent ranges for prefix queries.",
          implementationTipsPlaceholder: [
            "Maintain 1-based indexing for the tree array to avoid bitwise loops hanging on index 0",
            "Use loop conditions 'index <= maxElement' during point updates"
          ],
          commonMistakesPlaceholder: [
            "Attempting to run 0-indexed loops, causing infinite execution paths.",
            "Incorrectly applying query results to non-cumulative range queries."
          ],
          linkedPracticeProblems: [
            {
              id: 2301,
              title: "Range Sum Query 2D - Mutable",
              difficulty: "Hard",
              pattern: "Fenwick Tree",
              link: "https://leetcode.com/problems/range-sum-query-2d-mutable/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default fenwicktree;
