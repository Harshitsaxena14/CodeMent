const bst = {
  id: 18,
  topicId: "bst",
  title: "Binary Search Tree",
  description: "Learn BST ordered invariants (left < root < right), binary searches, node insertions, and deletions.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["tree", "binarysearch"],
  learningObjectives: [
    "Verify binary search tree invariants recursively",
    "Perform search, insert, and delete operations in O(H) height complexity"
  ],
  concepts: ["Inorder Sorting", "BST Invariants", "BST Insertion / Deletion"],
  modules: [
    {
      id: "mod-bst-basics",
      title: "BST Operations & Properties",
      order: 1,
      shortDescription: "Leverage tree ordering to execute searches, insertions, and removals.",
      estimatedTime: "120 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-bst-validate",
          title: "BST Validation",
          learningObjective: "Verify if a binary tree is a valid BST in O(N) time.",
          estimatedDuration: "30 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "A Binary Search Tree (BST) requires that for each node, all left subtree values are strictly smaller, and all right subtree values are strictly larger. To validate this, carry range bounds (min, max) down recursively. Check that node.val lies strictly between min and max, updating bounds dynamically.",
          implementationTipsPlaceholder: [
            "Use inorder traversal as another verification: an inorder traversal of a valid BST yields sorted values",
            "Be sure to pass long/infinity bounds initially to prevent overflow issues"
          ],
          commonMistakesPlaceholder: [
            "Only comparing a node to its direct children rather than checking the entire subtree bounds.",
            "Allowing duplicate values in strict BST definitions."
          ],
          linkedPracticeProblems: [
            {
              id: 1801,
              title: "Validate Binary Search Tree",
              difficulty: "Medium",
              pattern: "DFS Bounds",
              link: "https://leetcode.com/problems/validate-binary-search-tree/"
            },
            {
              id: 1802,
              title: "Delete Node in a BST",
              difficulty: "Medium",
              pattern: "Inorder Successor",
              link: "https://leetcode.com/problems/delete-node-in-a-bst/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default bst;
