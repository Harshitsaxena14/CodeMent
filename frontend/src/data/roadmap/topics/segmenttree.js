const segmenttree = {
  id: 22,
  topicId: "segmenttree",
  title: "Segment Tree",
  description: "Learn segment partition trees, range sum query (RSQ) optimizations, point updates, and lazy propagation.",
  estimatedTime: "5 Hours",
  difficulty: "Hard",
  prerequisites: ["tree", "basics"],
  learningObjectives: [
    "Execute range queries and point updates in O(log N) runtime",
    "Identify node index mappings in binary heap arrays representing segment intervals"
  ],
  concepts: ["Interval Division", "Range Query", "Lazy Propagation"],
  modules: [
    {
      id: "mod-segmenttree-basics",
      title: "Range Operations & Intervals",
      order: 1,
      shortDescription: "Evaluate range values and apply point updates in logarithmic time.",
      estimatedTime: "180 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-segmenttree-rsq",
          title: "Range Sum Query",
          learningObjective: "Write a Segment Tree supporting query and point updates in O(log N) time.",
          estimatedDuration: "40 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "A Segment Tree is a binary tree used for storing intervals or segments. It allows querying a range (e.g. range sum or range min) and updating values in O(log N) time. The tree root represents the entire array bounds, and child nodes partition the bounds in half.",
          implementationTipsPlaceholder: [
            "Use an array of size 4 * N to represent the complete binary tree structure",
            "Evaluate mid = start + Math.floor((end - start) / 2) to descend recursively"
          ],
          commonMistakesPlaceholder: [
            "Allocating insufficient array size (e.g. size 2 * N instead of 4 * N), raising index errors.",
            "Off-by-one errors on overlapping range boundary queries."
          ],
          linkedPracticeProblems: [
            {
              id: 2201,
              title: "Range Sum Query - Mutable",
              difficulty: "Medium",
              pattern: "Segment Tree",
              link: "https://leetcode.com/problems/range-sum-query-mutable/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default segmenttree;
