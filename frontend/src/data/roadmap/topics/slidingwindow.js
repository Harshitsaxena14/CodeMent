const slidingwindow = {
  id: 11,
  topicId: "slidingwindow",
  title: "Sliding Window",
  description: "Track contiguous array segments, expanding and shrinking pointer frames to optimize subarray scans.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["arrays", "twopointer"],
  learningObjectives: [
    "Identify optimal substring frames by shifting boundary offsets",
    "Resolve subarray sum constraints using sliding left/right pointer bounds"
  ],
  concepts: ["Fixed Window", "Variable Window", "Subsegment Scans"],
  modules: [
    {
      id: "mod-slidingwindow-types",
      title: "Fixed & Variable Windows",
      order: 1,
      shortDescription: "Master sliding frames to parse contiguous data ranges efficiently.",
      estimatedTime: "180 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-slidingwindow-variable",
          title: "Variable Window Size",
          learningObjective: "Determine longest subarray conforming to character constraints in linear O(N) runtime.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "A sliding window maintains a contiguous subarray frame over a list. Expand the window by advancing the right pointer. Once constraints are violated (e.g. unique char checks fail), contract the window by advancing the left pointer until valid bounds are restored. This avoids re-scanning, keeping operations linear O(N).",
          implementationTipsPlaceholder: [
            "Use a hash map or frequency array to track elements inside the active window",
            "Update global max lengths only when the window is in a valid state"
          ],
          commonMistakesPlaceholder: [
            "Shrinking bounds past the right pointer location, yielding invalid sizes.",
            "Omitting loop trackers that shrink window dimensions."
          ],
          linkedPracticeProblems: [
            {
              id: 1101,
              title: "Longest Substring Without Repeating Characters",
              difficulty: "Medium",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
            },
            {
              id: 1102,
              title: "Minimum Window Substring",
              difficulty: "Hard",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/minimum-window-substring/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default slidingwindow;
