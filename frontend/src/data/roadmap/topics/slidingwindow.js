const slidingwindow = {
  id: 13,
  topicId: "sliding-window",
  title: "Sliding Window",
  description: "Sub-segment subarray optimizations. Avoid repetitive inner loop iterations on contiguous sequences.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["arrays"],
  learningObjectives: ["Manage dynamic window bounds", "Optimize nested sum checks"],
  modules: [
    {
      id: "mod-sliding-window-variants",
      title: "Window Boundary Adapters",
      order: 1,
      shortDescription: "Track contiguous array segments using variable head/tail indexes.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-sliding-window-fixed",
          title: "Subarray Range Sliders",
          learningObjective: "Acquire sliding range sums in linear time complexity.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Maintain sliding indexes boundaries. Add front element value and subtract tail element value dynamically.",
          implementationTipsPlaceholder: ["Use pointers left and right to control ranges"],
          commonMistakesPlaceholder: ["Forgetting boundary index offset adjustments"],
          linkedPracticeProblems: [
            { id: "sw1", title: "Minimum Size Subarray Sum", difficulty: "Medium", pattern: "Sliding Window", link: "https://leetcode.com/problems/minimum-size-subarray-sum/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default slidingwindow;
