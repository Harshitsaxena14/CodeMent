const fenwicktree = {
  id: 23,
  topicId: "fenwick-tree",
  title: "Fenwick Trees (BIT)",
  description: "Binary Indexed Trees mapping prefix intervals. Optimize range queries and point modifications in minimal memory footprints.",
  estimatedTime: "5 Hours",
  difficulty: "Hard",
  prerequisites: ["arrays"],
  learningObjectives: ["Understand LSB bits extraction operations", "Perform point updates"],
  modules: [
    {
      id: "mod-fenwick-ops",
      title: "Binary Indexed Trees operations",
      order: 1,
      shortDescription: "Calculate prefix sums using dynamic BIT arrays.",
      estimatedTime: "60 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-fenwick-lsb",
          title: "LSB index mutations",
          learningObjective: "Perform prefix updates using bit index math: index += index & (-index).",
          estimatedDuration: "30 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Trace indexes using lowest set bit (LSB) offsets. Traverse indices tree to accumulate counts.",
          implementationTipsPlaceholder: ["Ensure 1-based indexing structures are strictly maintained"],
          commonMistakesPlaceholder: ["Writing infinite loops due to index zero modifications"],
          linkedPracticeProblems: [
            { id: "ft1", title: "Count of Smaller Numbers After Self", difficulty: "Hard", pattern: "Fenwick Tree", link: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default fenwicktree;
