const tree = {
  id: 7,
  topicId: "tree",
  title: "Trees",
  description: "Non-linear hierarchical structures. Master recursive tree traversals (pre/in/post-order), BFS level orders, and node height checks.",
  estimatedTime: "6 Hours",
  difficulty: "Medium",
  prerequisites: ["basics", "recursion"],
  learningObjectives: [
    "Navigate trees recursively using pre/in/post-order DFS traversals",
    "Identify sibling levels in binary trees using BFS level queues"
  ],
  concepts: ["Binary Tree", "DFS / BFS Traversals", "Lowest Common Ancestor"],
  modules: [
    {
      id: "mod-tree-traversals",
      title: "Hierarchical Navigation",
      order: 1,
      shortDescription: "Navigate nodes depth-wise and level-wise using recursion and queues.",
      estimatedTime: "180 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-tree-dfs",
          title: "Depth First Search",
          learningObjective: "Implement recursive preorder, inorder, and postorder traversals in O(N) runtime.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Trees are nested hierarchical structures. Depth First Search (DFS) uses recursion to traverse down to leaf nodes before backtracking. The traversal order is defined by when the root is visited: pre-order (root-left-right), in-order (left-root-right), or post-order (left-right-root).",
          implementationTipsPlaceholder: [
            "Always define your base case when root is null",
            "Be aware that deep trees consume recursion stack frames in O(H) space"
          ],
          commonMistakesPlaceholder: [
            "Forgetting null root checks, causing null pointer exceptions.",
            "Confusing preorder vs postorder order boundaries in tree mutation logic."
          ],
          linkedPracticeProblems: [
            {
              id: 701,
              title: "Maximum Depth of Binary Tree",
              difficulty: "Easy",
              pattern: "DFS recursion",
              link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
            },
            {
              id: 702,
              title: "Binary Tree Level Order Traversal",
              difficulty: "Medium",
              pattern: "BFS Queue",
              link: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
            },
            {
              id: 703,
              title: "Lowest Common Ancestor of a Binary Tree",
              difficulty: "Medium",
              pattern: "DFS Ancestry",
              link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default tree;
