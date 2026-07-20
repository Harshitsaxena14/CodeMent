const linkedlist = {
  id: 4,
  topicId: "linkedlist",
  title: "Linked Lists",
  description: "Non-contiguous elements connected via pointers. Master node operations, reversals, and loop boundaries.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: [
    "Reverse linked sequence pointers in-place",
    "Identify cycle points using slow-fast pointer traversals"
  ],
  concepts: ["Traversal", "Reversal", "Cycle Detection"],
  modules: [
    {
      id: "mod-linkedlist-reversal",
      title: "Linked Node Reversals",
      order: 1,
      shortDescription: "Swap pointer links in-place to reverse nodes sequentially.",
      estimatedTime: "120 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-linkedlist-reverse",
          title: "In-Place List Reversal",
          learningObjective: "Rearrange list node pointers sequentially using zero extra auxiliary memory.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Track prev, curr, and next node markers. Mutate pointers dynamically in a single forward pass. Set next = curr.next, update curr.next = prev, shift prev = curr, and advance curr = next. This reverses list direction in-place without memory overhead.",
          implementationTipsPlaceholder: [
            "Initialize prev as null and curr as head",
            "Be sure to update head pointer references at the end of the loop"
          ],
          commonMistakesPlaceholder: [
            "Losing node list reference trackers before mutating curr.next.",
            "Accessing null pointer fields on empty lists."
          ],
          linkedPracticeProblems: [
            {
              id: 401,
              title: "Reverse Linked List",
              difficulty: "Easy",
              pattern: "Pointer Swapping",
              link: "https://leetcode.com/problems/reverse-linked-list/"
            },
            {
              id: 402,
              title: "Linked List Cycle",
              difficulty: "Easy",
              pattern: "Fast-Slow Pointer",
              link: "https://leetcode.com/problems/linked-list-cycle/"
            },
            {
              id: 403,
              title: "Reverse Nodes in k-Group",
              difficulty: "Hard",
              pattern: "Node Swapping",
              link: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default linkedlist;
