const bst = {
  id: 18,
  topicId: "bst",
  title: "Binary Search Trees",
  description: "Sorted non-linear hierarchies. Verify tree properties, insert nodes, and balance indices routes.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["tree"],
  learningObjectives: ["Verify BST properties recursively", "Optimize node insertions"],
  modules: [
    {
      id: "mod-bst-validations",
      title: "BST Properties Validations",
      order: 1,
      shortDescription: "Validate sorted tree boundaries recursively.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-bst-verify",
          title: "Recursive BST Verification",
          learningObjective: "Validate range constraints on node values in O(N) runtime.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Pass parent min/max constraints recursively to children. Ensure value sits within boundaries.",
          implementationTipsPlaceholder: ["Use helper function passing min, max limits parameters"],
          commonMistakesPlaceholder: ["Only verifying immediate left/right child nodes, missing deep subtree validation"],
          linkedPracticeProblems: [
            { id: "bst1", title: "Validate Binary Search Tree", difficulty: "Medium", pattern: "Recursion", link: "https://leetcode.com/problems/validate-binary-search-tree/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default bst;
