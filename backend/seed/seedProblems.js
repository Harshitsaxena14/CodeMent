const Problem = require("../models/problemmodel");

const seedProblems = async () => {
  const seedData = [
    {
      title: "Two Sum",
      slug: "two-sum",
      difficulty: "Easy",
      topics: ["Arrays", "Hash Table"],
      patterns: ["HashMap"],
      topicId: "2",
      leetcodeId: 1,
      url: "https://leetcode.com/problems/two-sum/"
    },
    {
      title: "Median of Two Sorted Arrays",
      slug: "median-of-two-sorted-arrays",
      difficulty: "Hard",
      topics: ["Binary Search", "Divide and Conquer"],
      patterns: ["Binary Search"],
      topicId: "2",
      leetcodeId: 4,
      url: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
    },
    {
      title: "Maximum Subarray",
      slug: "maximum-subarray",
      difficulty: "Medium",
      topics: ["Dynamic Programming"],
      patterns: ["Kadane Algorithm"],
      topicId: "2",
      leetcodeId: 53,
      url: "https://leetcode.com/problems/maximum-subarray/"
    }
  ];

  for (const p of seedData) {
    await Problem.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
  }

  console.log(`Seeded ${seedData.length} problems`);
};

module.exports = seedProblems;

