const tree = {
  id: 7,
  topicId: "tree",
  title: "Trees",
  description: "Non-linear hierarchy paths. Master DFS/BFS traversals, binary search properties, and ancestor matching.",
  estimatedTime: "6 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: [
    "Trace DFS pre/post-order loops",
    "Identify lowest common ancestors"
  ],
  concepts: ["BFS & DFS Traversals", "Binary Search Trees (BST)", "LCA Ancestors"],
  modules: [
    {
      id: "mod-tree-bst",
      title: "Binary Search Traversals",
      order: 1,
      shortDescription: "Locate target node coordinates inside sorted structures.",
      estimatedTime: "50 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-tree-bst-properties",
          title: "BST Left-Right properties",
          learningObjective: "Search target elements within logarithmic constraints O(log N) on average.",
          estimatedDuration: "20 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Traverse tree nodes recursively, dividing search spaces at each node step comparisons.",
          implementationTipsPlaceholder: ["Recursion base case: return null if node is empty"],
          commonMistakesPlaceholder: ["Forgetting that unbalanced BST branches degenerate search speeds back to linear O(N)"],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Invert Binary Tree",
              difficulty: "Easy",
              pattern: "DFS",
              link: "https://leetcode.com/problems/invert-binary-tree/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default tree;
