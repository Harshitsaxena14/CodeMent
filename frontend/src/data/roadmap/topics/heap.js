const heap = {
  id: 19,
  topicId: "heap",
  title: "Heaps & Priority Queues",
  description: "Complete binary trees tracking maximum or minimum elements. Study heapify operations, insertion bubbles, and top-K filters.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["tree"],
  learningObjectives: ["Understand heap index array models", "Trace priority queue filters"],
  modules: [
    {
      id: "mod-heap-ops",
      title: "Binary Heap Operations",
      order: 1,
      shortDescription: "Insert, delete, and heapify binary array trees.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-heapify-down",
          title: "Heapify-Down array mutations",
          learningObjective: "Restore heap order constraints in logarithmic complexity O(log N).",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Bubble elements down array branches, swapping with the larger child node index.",
          implementationTipsPlaceholder: ["Map children indexes as: left = 2*i + 1, right = 2*i + 2"],
          commonMistakesPlaceholder: ["OutOfBounds index exceptions on child checks"],
          linkedPracticeProblems: [
            { id: "hp1", title: "Kth Largest Element in an Array", difficulty: "Medium", pattern: "Heap / Sorting", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default heap;
