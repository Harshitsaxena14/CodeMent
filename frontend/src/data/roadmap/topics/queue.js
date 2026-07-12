const queue = {
  id: 6,
  topicId: "queue",
  title: "Queues",
  description: "FIFO buffer sequences. Master queue traversal, circular grids, and sliding window averages.",
  estimatedTime: "3 Hours",
  difficulty: "Medium",
  prerequisites: ["arrays"],
  learningObjectives: [
    "Manage FIFO queue structures",
    "Trace sliding average arrays"
  ],
  concepts: ["FIFO Operations", "Circular Queue", "Deque Window"],
  modules: [
    {
      id: "mod-queue-deque",
      title: "Deque Sliding Ranges",
      order: 1,
      shortDescription: "Track window maxima using double-ended index filters.",
      estimatedTime: "45 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-queue-sliding-max",
          title: "Double-Ended Index Slices",
          learningObjective: "Extract maximum subarray elements in linear O(N) constraints.",
          estimatedDuration: "25 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Maintains a sliding index window. Prune older indexes exceeding window sizes.",
          implementationTipsPlaceholder: ["Use a deque to store coordinates index array keys"],
          commonMistakesPlaceholder: ["Storing element values instead of indices"],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Sliding Window Maximum",
              difficulty: "Hard",
              pattern: "Deque",
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
