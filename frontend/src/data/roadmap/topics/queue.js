const queue = {
  id: 6,
  topicId: "queue",
  title: "Queues & Deques",
  description: "FIFO (First-In-First-Out) linear collections. Master BFS level traversals, circular queues, and sliding deques.",
  estimatedTime: "4 Hours",
  difficulty: "Medium",
  prerequisites: ["basics"],
  learningObjectives: [
    "Execute FIFO structures to process items in BFS orders",
    "Apply Monotonic Deque pointers to capture range maximums"
  ],
  concepts: ["FIFO Operations", "Double-Ended Queue (Deque)", "Breadth First Search (BFS) Queue"],
  modules: [
    {
      id: "mod-queue-concepts",
      title: "FIFO Traversals",
      order: 1,
      shortDescription: "Track linear sequences sequentially using FIFO push/shift steps.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-queue-traversal",
          title: "FIFO Level Traversal",
          learningObjective: "Process elements in level-by-level BFS orders using queues.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Queues operate on a First-In, First-Out (FIFO) model. Push elements to the back, and pop/shift them from the front. This is the cornerstone of BFS tree/graph traversals, where nodes are processed in order of their distance from the start.",
          implementationTipsPlaceholder: [
            "Use native arrays or custom doubly-linked lists to execute front shifting in O(1)",
            "Track queue length before inner loops to process nodes level-by-level"
          ],
          commonMistakesPlaceholder: [
            "Using O(N) shift operations on large arrays, raising runtimes.",
            "Adding duplicate items to queue structures, causing out-of-memory crashes."
          ],
          linkedPracticeProblems: [
            {
              id: 601,
              title: "Implement Queue using Stacks",
              difficulty: "Easy",
              pattern: "FIFO Queue",
              link: "https://leetcode.com/problems/implement-queue-using-stacks/"
            },
            {
              id: 602,
              title: "Sliding Window Maximum",
              difficulty: "Hard",
              pattern: "Monotonic Deque",
              link: "https://leetcode.com/problems/sliding-window-maximum/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default queue;
