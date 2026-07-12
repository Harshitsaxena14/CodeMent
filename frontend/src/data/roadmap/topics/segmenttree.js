const segmenttree = {
  id: 22,
  topicId: "segment-tree",
  title: "Segment Trees",
  description: "Interval query trees. Solve range sum updates and range minimum queries within logarithmic times.",
  estimatedTime: "6 Hours",
  difficulty: "Hard",
  prerequisites: ["tree"],
  learningObjectives: ["Build segment index arrays", "Perform range updates"],
  modules: [
    {
      id: "mod-segtree-queries",
      title: "Range Interval Queries",
      order: 1,
      shortDescription: "Answer point updates and range query sums.",
      estimatedTime: "90 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-segtree-build",
          title: "Segment Tree Construction",
          learningObjective: "Divide range inputs into interval tree nodes recursively in O(N).",
          estimatedDuration: "40 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Compute left/right tree indices merges. Update node values to store sum/minimum values.",
          implementationTipsPlaceholder: ["Allocate array sizes of 4*N to prevent overflow exceptions"],
          commonMistakesPlaceholder: ["Incomplete bounds checking on range overlap checks"],
          linkedPracticeProblems: [
            { id: "st1", title: "Range Sum Query - Mutable", difficulty: "Medium", pattern: "Segment Tree", link: "https://leetcode.com/problems/range-sum-query-mutable/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default segmenttree;
