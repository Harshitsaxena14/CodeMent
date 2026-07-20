// Local Heuristic Classifier for CodeMent Extension
import { formatSlugToTitle } from "./helpers.js";

export function classifyProblemLocally(slug, title, tagsString) {
  const lowercaseTitle = (title || "").toLowerCase();
  const lowercaseTags = (tagsString || "").toLowerCase();
  const lowercaseSlug = (slug || "").toLowerCase();

  const matches = (keyword) => {
    return lowercaseTitle.includes(keyword) || 
           lowercaseTags.includes(keyword) || 
           lowercaseSlug.includes(keyword);
  };

  // 1. Binary Search
  if (matches("binary search") || matches("search in rotated") || matches("search a 2d") || matches("find peak") || matches("search range")) {
    return {
      title: title || formatSlugToTitle(slug),
      topic: "Binary Search",
      pattern: "Binary Search Search Range",
      complexity: { time: "O(log N)", space: "O(1)" },
      logic: "Perform index halving. Calculate mid-point and adjust left or right boundaries based on target comparison.",
      hints: [
        "Ensure array is sorted or behaves monotonically.",
        "Watch for boundaries logic: left <= right vs left < right.",
        "Calculate mid as left + Math.floor((right - left) / 2) to avoid overflow."
      ],
      mistakes: [
        "Infinite loops due to boundary update errors (forgetting mid + 1 or mid - 1).",
        "Integer overflow on mid calculation."
      ],
      edgeCases: [
        "Array contains only one element.",
        "Target value lies outside bounds.",
        "Duplicates in search arrays."
      ],
      source: "Estimated"
    };
  }

  // 2. Sliding Window
  if (matches("sliding window") || matches("longest substring") || matches("minimum window") || matches("subarrays with")) {
    return {
      title: title || formatSlugToTitle(slug),
      topic: "Sliding Window",
      pattern: "Variable Sliding Window",
      complexity: { time: "O(N)", space: "O(min(M, N))" },
      logic: "Maintain a window using two pointers. Expand with the right pointer and shrink with the left pointer when constraints are violated.",
      hints: [
        "Use a hash map or frequency array to store window character counts.",
        "Expand the right pointer to include elements, and update constraints.",
        "Shrink the left pointer when constraints break, updating the optimal result at each step."
      ],
      mistakes: [
        "Expanding or shrinking pointers out of bounds.",
        "Using nested loops yielding O(N^2) instead of O(N) linear time."
      ],
      edgeCases: [
        "Empty string or collection.",
        "Inputs containing all identical values.",
        "K constraint values greater than collection size."
      ],
      source: "Estimated"
    };
  }

  // 3. Trees
  if (matches("tree") || matches("node") || matches("bst") || matches("ancestor") || matches("depth of") || matches("traverse") || matches("invert") || matches("path sum")) {
    return {
      title: title || formatSlugToTitle(slug),
      topic: "Trees",
      pattern: "Depth First Search",
      complexity: { time: "O(N)", space: "O(H)" },
      logic: "Traverse tree nodes recursively (pre-order, in-order, or post-order) or iteratively using a stack or queue (BFS).",
      hints: [
        "Check base condition: is root node null?",
        "Solve children subtrees recursively first.",
        "For BST, remember that left subtree elements < root < right subtree elements."
      ],
      mistakes: [
        "Forgetting to handle null root leaf nodes, causing null pointer exceptions.",
        "Incorrect recursive returns (e.g. not aggregating child results)."
      ],
      edgeCases: [
        "Empty tree input.",
        "Single-node tree.",
        "Skewed trees (nodes have only left or only right children)."
      ],
      source: "Estimated"
    };
  }

  // 4. Graphs
  if (matches("graph") || matches("island") || matches("matrix") || matches("path") || matches("network") || matches("flood") || matches("connected") || matches("ladder")) {
    return {
      title: title || formatSlugToTitle(slug),
      topic: "Graphs",
      pattern: "DFS/BFS Grid Traversals",
      complexity: { time: "O(V + E)", space: "O(V + E)" },
      logic: "Represent vertices and edges as an adjacency list or matrix. Traverse nodes using a queue (BFS) or recursion/stack (DFS) tracking visited states.",
      hints: [
        "Use a visited hash set to prevent infinite cycles.",
        "For grid problems, verify boundary limits: row < 0 or row >= M or col < 0 or col >= N.",
        "BFS is optimal for shortest paths in unweighted graphs."
      ],
      mistakes: [
        "Infinite loops because visited states were not tracked.",
        "Forgetting grid boundary checks."
      ],
      edgeCases: [
        "Disconnected graph components.",
        "Cyclic connections.",
        "Empty graph matrix."
      ],
      source: "Estimated"
    };
  }

  // 5. Dynamic Programming
  if (matches("dynamic programming") || matches("dp") || matches("subsequence") || matches("knapsack") || matches("climbing stairs") || matches("robber") || matches("subarray")) {
    return {
      title: title || formatSlugToTitle(slug),
      topic: "Dynamic Programming",
      pattern: "Memoization & Tabulation",
      complexity: { time: "O(N)", space: "O(N)" },
      logic: "Identify overlapping subproblems and optimal substructure. Solve recursively with memoization, or iteratively with tabulation.",
      hints: [
        "Write down base cases first.",
        "Formulate a state transition recurrence relation.",
        "Optimize memory to O(1) space if only the previous states are needed."
      ],
      mistakes: [
        "Recursion without memoization leading to TLE.",
        "Incorrect base cases initialization."
      ],
      edgeCases: [
        "N = 0 or 1 edge inputs.",
        "All values negative."
      ],
      source: "Estimated"
    };
  }

  // 6. Two Pointers
  if (matches("two pointer") || matches("pointer") || matches("swap") || matches("reverse") || matches("palindrome") || matches("remove duplicate") || matches("intervals")) {
    return {
      title: title || formatSlugToTitle(slug),
      topic: "Two Pointers",
      pattern: "Two Pointer Swaps",
      complexity: { time: "O(N)", space: "O(1)" },
      logic: "Maintain two index pointers (start/end or read/write) and adjust their locations inwards or forwards based on target checks.",
      hints: [
        "Check sorting preconditions. Pointers often depend on sorted bounds.",
        "Ensure indices do not cross or go out of boundaries.",
        "In-place changes maintain constant space O(1)."
      ],
      mistakes: [
        "Off-by-one pointer index errors.",
        "Pointers running past boundaries."
      ],
      edgeCases: [
        "Empty input collection.",
        "Collection with only one or two items.",
        "Inputs contain all identical values."
      ],
      source: "Estimated"
    };
  }

  // 7. Hash Map / Hashing
  if (matches("hash") || matches("map") || matches("anagram") || matches("frequency") || matches("duplicate") || matches("intersect") || matches("two sum")) {
    return {
      title: title || formatSlugToTitle(slug),
      topic: "Hashing",
      pattern: "HashMap Complements",
      complexity: { time: "O(N)", space: "O(N)" },
      logic: "Use a hash map or hash set to record seen values or element counts to check target matches in a single traversal pass.",
      hints: [
        "Use values as keys and indices or frequencies as map values.",
        "Lookups are O(1) time complexity.",
        "Watch space complexity limits since hash maps allocate O(N) space."
      ],
      mistakes: [
        "Not handling hash map key collisions.",
        "Excessive memory allocation."
      ],
      edgeCases: [
        "Duplicates or empty keys.",
        "Target value not present."
      ],
      source: "Estimated"
    };
  }

  // 8. General Array/List (Default Fallback)
  return {
    title: title || formatSlugToTitle(slug),
    topic: "Arrays",
    pattern: "Linear Scan",
    complexity: { time: "O(N)", space: "O(1)" },
    logic: "Perform a linear scan or simulation over the elements of the collection, maintaining state track variables.",
    hints: [
      "Scan items sequentially tracking dynamic maximums or counts.",
      "Check standard boundary index parameters.",
      "Ensure space allocated matches the limits constraints."
    ],
    mistakes: [
      "Accessing indices out of range.",
      "Unnecessary nested iterations."
    ],
    edgeCases: [
      "Empty collection or array.",
      "Single-element collections.",
      "Integer boundary overflow bounds."
    ],
    source: "Estimated"
  };
}
