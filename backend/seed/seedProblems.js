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
      url: "https://leetcode.com/problems/two-sum/",
      topic: "Arrays",
      pattern: "HashMap Complements",
      subPattern: "Single-pass complementing target lookup",
      roadmapSection: "Arrays → Complements",
      roadmapOrder: 1,
      estimatedTime: "15 Mins",
      prerequisites: ["Basic Arrays", "Hash Table Concept"],
      companies: ["Google", "Meta", "Amazon", "Microsoft"],
      tags: ["Array", "Hash Table"],
      complexity: {
        time: "O(N)",
        space: "O(N)"
      },
      logic: "Use a hash map to keep track of indices of elements you have already seen. For each number, check if its complement (target - num) exists in the map.",
      hints: [
        "Try using a hash map to keep track of indices of elements you have already seen.",
        "For each number, check if its complement (target - num) exists in the map.",
        "If it does, you found your pair. Return their indices.",
        "If it doesn't, add the current number and its index to the map."
      ],
      commonMistakes: ["Using nested loops yielding O(N^2) time complexity", "Forgetting that elements cannot be used twice"],
      mistakes: ["Using nested loops yielding O(N^2) time complexity", "Forgetting that elements cannot be used twice"],
      edgeCases: ["Duplicate numbers in the array matching the target.", "Negative numbers or zero matching target."],
      revisionNotes: ["HashMap lookup is O(1) time.", "Space is O(N) due to hash table allocation."],
      similarProblems: ["3Sum", "Two Sum II"]
    },
    {
      title: "Median of Two Sorted Arrays",
      slug: "median-of-two-sorted-arrays",
      difficulty: "Hard",
      topics: ["Binary Search", "Divide and Conquer"],
      patterns: ["Binary Search"],
      topicId: "2",
      leetcodeId: 4,
      url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      topic: "Binary Search",
      pattern: "Binary Search Range Partitioning",
      subPattern: "Simultaneous left-right partition boundaries",
      roadmapSection: "Binary Search → Partitioning",
      roadmapOrder: 4,
      estimatedTime: "45 Mins",
      prerequisites: ["Binary Search", "Median Concept"],
      companies: ["Google", "Microsoft", "Uber", "Apple"],
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      complexity: {
        time: "O(log(min(M, N)))",
        space: "O(1)"
      },
      logic: "Partition both arrays such that the left half is equal to or slightly larger than the right half. Use binary search on the smaller array to find the correct partition index.",
      hints: [
        "We need to partition both arrays such that the left half is equal to or slightly larger than the right half.",
        "Use binary search on the smaller array to find the correct partition index.",
        "Check the edge conditions where elements on the boundary are out of order.",
        "Return the median based on whether the total elements count is odd or even."
      ],
      commonMistakes: ["Checking boundaries out of bounds", "Incorrect binary search range selection"],
      mistakes: ["Checking boundaries out of bounds", "Incorrect binary search range selection"],
      edgeCases: ["Empty array inputs.", "Arrays with negative numbers."],
      revisionNotes: ["Binary search must run on the shorter array only."],
      similarProblems: ["Median of sorted arrays"]
    },
    {
      title: "Maximum Subarray",
      slug: "maximum-subarray",
      difficulty: "Medium",
      topics: ["Dynamic Programming"],
      patterns: ["Kadane Algorithm"],
      topicId: "2",
      leetcodeId: 53,
      url: "https://leetcode.com/problems/maximum-subarray/",
      topic: "Dynamic Programming",
      pattern: "Kadane Algorithm",
      subPattern: "Local vs Global subarray sums tracking",
      roadmapSection: "Dynamic Programming → Linear DP",
      roadmapOrder: 2,
      estimatedTime: "20 Mins",
      prerequisites: ["Prefix Sums", "Dynamic Programming Basics"],
      companies: ["Amazon", "LinkedIn", "Microsoft", "Google"],
      tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
      complexity: {
        time: "O(N)",
        space: "O(1)"
      },
      logic: "Maintain a running sum of the maximum subarray ending at the current element. At each position, decide whether to continue the existing subarray or start a new subarray.",
      hints: [
        "At each position, decide whether to append the element to the current subarray or start a new subarray.",
        "Keep track of the max sum seen so far globally.",
        "Formula: localMax = max(nums[i], localMax + nums[i])."
      ],
      commonMistakes: ["Assuming the array contains only positive numbers", "Returning 0 for all-negative arrays"],
      mistakes: ["Assuming the array contains only positive numbers", "Returning 0 for all-negative arrays"],
      edgeCases: ["Array containing all negative integers.", "Single-element array."],
      revisionNotes: ["Kadane's algorithm requires O(1) space."],
      similarProblems: ["Maximum Subarray Sum", "Maximum Subarray Product"]
    },
    {
      title: "Move Zeroes",
      slug: "move-zeroes",
      difficulty: "Easy",
      topics: ["Arrays", "Two Pointers"],
      patterns: ["Two Pointers"],
      topicId: "2",
      leetcodeId: 283,
      url: "https://leetcode.com/problems/move-zeroes/",
      topic: "Arrays",
      pattern: "Two Pointer Swaps",
      subPattern: "Active writing pointer tracking non-zeroes",
      roadmapSection: "Arrays → Two Pointers",
      roadmapOrder: 2,
      estimatedTime: "10 Mins",
      prerequisites: ["Basic Arrays"],
      companies: ["Meta", "Apple", "Google"],
      tags: ["Array", "Two Pointers"],
      complexity: {
        time: "O(N)",
        space: "O(1)"
      },
      logic: "Use a two-pointer approach: one write pointer to place the next non-zero element, and a read pointer to scan the array. Swap non-zero elements into the write pointer.",
      hints: [
        "Use a two-pointer approach: one to track the last non-zero element position and another to iterate the array.",
        "Swap elements in-place to keep space complexity at O(1)."
      ],
      commonMistakes: ["Creating a new array violating O(1) space constraints.", "Overwriting items before saving them."],
      mistakes: ["Creating a new array violating O(1) space constraints.", "Overwriting items before saving them."],
      edgeCases: ["Array contains only zeroes.", "Array has no zeroes.", "Single-element array."],
      revisionNotes: ["In-place array swaps maintain O(1) space."],
      similarProblems: ["Remove Element"]
    },
    {
      title: "Valid Anagram",
      slug: "valid-anagram",
      difficulty: "Easy",
      topics: ["Hash Table", "String", "Sorting"],
      patterns: ["HashMap"],
      topicId: "3",
      leetcodeId: 242,
      url: "https://leetcode.com/problems/valid-anagram/",
      topic: "Strings",
      pattern: "Character Frequency Map",
      subPattern: "Fixed size index bucket tracking",
      roadmapSection: "Strings → Frequency Matching",
      roadmapOrder: 1,
      estimatedTime: "10 Mins",
      prerequisites: ["Hash Table Concept"],
      companies: ["Google", "Amazon", "Uber"],
      tags: ["Hash Table", "String", "Sorting"],
      complexity: {
        time: "O(N)",
        space: "O(1)"
      },
      logic: "Count character frequencies in s, then decrement count for each character in t. If all counts return 0, s and t are anagrams.",
      hints: [
        "An anagram has the exact same characters and counts.",
        "Use a fixed-size frequency array of size 26 for English lowercase letters."
      ],
      commonMistakes: ["Sorting first which yields O(N log N) time complexity instead of linear time.", "Not returning false early if lengths are different."],
      mistakes: ["Sorting first which yields O(N log N) time complexity instead of linear time.", "Not returning false early if lengths are different."],
      edgeCases: ["Different string lengths.", "Unicode characters (requires hash map)."],
      revisionNotes: ["Fixed size counts array yields constant space O(1)."],
      similarProblems: ["Group Anagrams"]
    },
    {
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
      difficulty: "Medium",
      topics: ["Hash Table", "String", "Sliding Window"],
      patterns: ["Sliding Window"],
      topicId: "3",
      leetcodeId: 3,
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      topic: "Strings",
      pattern: "Sliding Window",
      subPattern: "Variable-length sliding window",
      roadmapSection: "Strings → Sliding Window",
      roadmapOrder: 3,
      estimatedTime: "25 Mins",
      prerequisites: ["Sliding Window basics", "Hash Map"],
      companies: ["Amazon", "Bloomberg", "Google"],
      tags: ["Hash Table", "String", "Sliding Window"],
      complexity: {
        time: "O(N)",
        space: "O(min(M, N))"
      },
      logic: "Maintain a sliding window from left index to right index. Use a map to store last seen indices of characters. Shrink window when duplicates are encountered.",
      hints: [
        "Maintain a sliding window from left index to right index.",
        "Keep a map of characters to their last seen indices to fast-forward the left pointer."
      ],
      commonMistakes: ["Checking all substrings manually yielding O(N^3) time.", "Moving the left pointer backward accidentally."],
      mistakes: ["Checking all substrings manually yielding O(N^3) time.", "Moving the left pointer backward accidentally."],
      edgeCases: ["Empty string input.", "String with all identical characters.", "Long string with no repeats."],
      revisionNotes: ["Map lookups are O(1); left pointer must only move forward."],
      similarProblems: ["Longest Substring with At Most K Distinct Characters"]
    },
    {
      title: "Invert Binary Tree",
      slug: "invert-binary-tree",
      difficulty: "Easy",
      topics: ["Tree", "DFS", "BFS", "Binary Tree"],
      patterns: ["DFS"],
      topicId: "7",
      leetcodeId: 226,
      url: "https://leetcode.com/problems/invert-binary-tree/",
      topic: "Trees",
      pattern: "Depth First Search",
      subPattern: "Recursive subtree inversion",
      roadmapSection: "Trees → Structure Mutation",
      roadmapOrder: 1,
      estimatedTime: "12 Mins",
      prerequisites: ["Binary Tree traversals"],
      companies: ["Google", "Amazon", "Microsoft"],
      tags: ["Tree", "DFS", "BFS", "Binary Tree"],
      complexity: {
        time: "O(N)",
        space: "O(H)"
      },
      logic: "Recursively swap the left and right child pointers of every node from the root down to the leaves.",
      hints: [
        "Swap left and right subtrees recursively.",
        "Solve using a pre-order or post-order traversal pattern."
      ],
      commonMistakes: ["Forgetting to handle null leaf nodes.", "Overwriting left subtree references without storing them in a temporary variable."],
      mistakes: ["Forgetting to handle null leaf nodes.", "Overwriting left subtree references without storing them in a temporary variable."],
      edgeCases: ["Empty tree (root is null).", "Single-node tree.", "Skewed trees."],
      revisionNotes: ["Recursion stack space equals tree height H."],
      similarProblems: ["Flip Equivalent Binary Trees"]
    },
    {
      title: "Number of Islands",
      slug: "number-of-islands",
      difficulty: "Medium",
      topics: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
      patterns: ["DFS Grid Traversals"],
      topicId: "8",
      leetcodeId: 200,
      url: "https://leetcode.com/problems/number-of-islands/",
      topic: "Graphs",
      pattern: "DFS Grid Traversals",
      subPattern: "Grid flooding / Connected components search",
      roadmapSection: "Graphs → Matrix Traversals",
      roadmapOrder: 2,
      estimatedTime: "25 Mins",
      prerequisites: ["DFS/BFS traversals", "Matrix representations"],
      companies: ["Google", "Meta", "Amazon", "Bloomberg"],
      tags: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
      complexity: {
        time: "O(M * N)",
        space: "O(M * N)"
      },
      logic: "Iterate through the grid. When land ('1') is found, increment counter and trigger DFS/BFS to sink/mark connected land cells to water ('0').",
      hints: [
        "Treat the grid as an adjacency graph where land cells are connected horizontally and vertically.",
        "Use DFS or BFS to traverse and sink/mark the whole island once found."
      ],
      commonMistakes: ["Forgetting index boundary checks.", "Infinite recursion loops because visited land was not marked/sunk."],
      mistakes: ["Forgetting index boundary checks.", "Infinite recursion loops because visited land was not marked/sunk."],
      edgeCases: ["Empty grid matrix.", "Grid containing only water ('0').", "Grid containing only land ('1')."],
      revisionNotes: ["Sinking land is an in-place alternative to a visited matrix."],
      similarProblems: ["Max Area of Island", "Surrounded Regions"]
    }
  ];

  for (const p of seedData) {
    await Problem.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
  }

  console.log(`Seeded ${seedData.length} problems`);
};

module.exports = seedProblems;
