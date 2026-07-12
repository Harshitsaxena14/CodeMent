const linkedlist = {
  id: 4,
  topicId: "linkedlist",
  title: "Linked Lists",
  description: "Non-contiguous elements connected via pointers. Master node operations, reversals, and loop boundaries.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: [
    "Reverse linked sequence pointers",
    "Identify cycle points using Tortoise-Hare traversal"
  ],
  concepts: ["Traversal", "Reversal", "Floyd's Cycle Detection"],
  modules: [
    {
      id: "mod-linkedlist-reversal",
      title: "Sequence Pointer Swaps",
      order: 1,
      shortDescription: "Swap links to reverse elements dynamically.",
      estimatedTime: "40 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-linkedlist-reverse",
          title: "In-Place List Reversal",
          learningObjective: "Rearrange list node pointers sequentially using zero extra auxiliary memory.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Track prev, curr, and next node markers. Mutate pointers dynamically in a single forward pass.",
          implementationTipsPlaceholder: ["Initialize prev as null and curr as head"],
          commonMistakesPlaceholder: ["Losing node list reference trackers before mutating curr.next"],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Reverse Linked List",
              difficulty: "Easy",
              pattern: "Pointer Swapping",
              link: "https://leetcode.com/problems/reverse-linked-list/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default linkedlist;
