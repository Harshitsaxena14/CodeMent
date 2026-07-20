const problems = {
  "two-sum": {
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    topicId: 2,
    topicName: "Arrays",
    pattern: "HashMap Complements",
    logic: "Use a hash map to keep track of indices of elements you have already seen. For each number, check if its complement (target - num) exists in the map.",
    complexity: { time: "O(N)", space: "O(N)" },
    hints: [
      "Try using a hash map to keep track of indices of elements you have already seen.",
      "For each number, check if its complement (target - num) exists in the map."
    ],
    mistakes: [
      "Using nested loops yielding O(N^2) time complexity",
      "Forgetting that elements cannot be used twice"
    ],
    edgeCases: [
      "Duplicate numbers in the array matching the target.",
      "Negative numbers or zero matching target."
    ]
  },
  "move-zeroes": {
    title: "Move Zeroes",
    difficulty: "Easy",
    topic: "Arrays",
    topicId: 2,
    topicName: "Arrays",
    pattern: "Two Pointer Swaps",
    logic: "Use a two-pointer approach: one write pointer to place the next non-zero element, and a read pointer to scan the array. Swap non-zero elements into the write pointer.",
    complexity: { time: "O(N)", space: "O(1)" },
    hints: [
      "Use a two-pointer approach: one to track the last non-zero element position and another to iterate the array.",
      "Swap elements in-place to keep space complexity at O(1)."
    ],
    mistakes: [
      "Creating a new array violating O(1) space constraints.",
      "Overwriting items before saving them."
    ],
    edgeCases: [
      "Array contains only zeroes.",
      "Array has no zeroes.",
      "Single-element array."
    ]
  },
  "maximum-subarray": {
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    topicId: 2,
    topicName: "Arrays",
    pattern: "Kadane Subarray Sum",
    logic: "Maintain a running sum of the maximum subarray ending at the current element. At each position, decide whether to continue the existing subarray or start a new subarray.",
    complexity: { time: "O(N)", space: "O(1)" },
    hints: [
      "At each position, decide whether to append the element to the current subarray or start a new subarray.",
      "Keep track of the max sum seen so far globally."
    ],
    mistakes: [
      "Assuming the array contains only positive numbers",
      "Returning 0 for all-negative arrays"
    ],
    edgeCases: [
      "Array containing all negative integers.",
      "Single-element array."
    ]
  },
  "valid-anagram": {
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Strings",
    topicId: 3,
    topicName: "Strings",
    pattern: "Character Frequency Map",
    logic: "Count character frequencies in s, then decrement count for each character in t. If all counts return 0, s and t are anagrams.",
    complexity: { time: "O(N)", space: "O(1)" },
    hints: [
      "An anagram has the exact same characters and counts.",
      "Use a fixed-size frequency array of size 26 for English lowercase letters."
    ],
    mistakes: [
      "Sorting first which yields O(N log N) time complexity instead of linear time.",
      "Not returning false early if lengths are different."
    ],
    edgeCases: [
      "Different string lengths.",
      "Unicode characters (requires hash map)."
    ]
  },
  "longest-substring-without-repeating-characters": {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Strings",
    topicId: 3,
    topicName: "Strings",
    pattern: "Sliding Window",
    logic: "Maintain a sliding window from left index to right index. Use a map to store last seen indices of characters. Shrink window when duplicates are encountered.",
    complexity: { time: "O(N)", space: "O(min(M, N))" },
    hints: [
      "Maintain a sliding window from left index to right index.",
      "Keep a map of characters to their last seen indices to fast-forward the left pointer."
    ],
    mistakes: [
      "Checking all substrings manually yielding O(N^3) time.",
      "Moving the left pointer backward accidentally."
    ],
    edgeCases: [
      "Empty string input.",
      "String with all identical characters.",
      "Long string with no repeats."
    ]
  },
  "invert-binary-tree": {
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    topicId: 7,
    topicName: "Trees",
    pattern: "Depth First Search",
    logic: "Recursively swap the left and right child pointers of every node from root to leaves.",
    complexity: { time: "O(N)", space: "O(H)" },
    hints: [
      "Swap left and right subtrees recursively.",
      "Solve using a pre-order or post-order traversal pattern."
    ],
    mistakes: [
      "Forgetting to handle null leaf nodes.",
      "Overwriting left subtree references without storing them in a temporary variable."
    ],
    edgeCases: [
      "Empty tree (root is null).",
      "Single-node tree.",
      "Skewed tree (only left children or only right children)."
    ]
  },
  "number-of-islands": {
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    topicId: 8,
    topicName: "Graphs",
    pattern: "DFS Grid Traversals",
    logic: "Iterate through the grid. When land ('1') is found, increment counter and trigger DFS/BFS to sink/mark connected land cells to water ('0').",
    complexity: { time: "O(M * N)", space: "O(M * N)" },
    hints: [
      "Treat the grid as an adjacency graph where land cells are connected horizontally and vertically.",
      "Use DFS or BFS to traverse and sink/mark the whole island once found."
    ],
    mistakes: [
      "Forgetting index boundary checks.",
      "Infinite recursion loops because visited land was not marked/sunk."
    ],
    edgeCases: [
      "Empty grid matrix.",
      "Grid contains only water ('0').",
      "Grid contains only land ('1')."
    ]
  }
};