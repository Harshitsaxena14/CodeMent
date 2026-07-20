const heap = {
  id: 19,
  topicId: "heap",
  title: "Heap / Priority Queue",
  description: "Learn binary heap structures, dynamic max/min extraction, K-way merges, and Top K sorting.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["tree"],
  learningObjectives: [
    "Perform dynamic min/max element extractions in O(log N) runtime",
    "Identify Top K elements in collections in O(N log K) time using min-heaps"
  ],
  concepts: ["Min Heap", "Max Heap", "Heapification"],
  modules: [
    {
      id: "mod-heap-basics",
      title: "Priority Ordering",
      order: 1,
      shortDescription: "Master sorting indices dynamically using min/max arrays.",
      estimatedTime: "120 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-heap-topk",
          title: "Top K Elements",
          learningObjective: "Locate K largest elements in collections in O(N log K) time.",
          estimatedDuration: "30 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Heaps maintain hierarchical priority order. A min-heap root stores the smallest item. To find the top K largest values, iterate through the list and push elements onto a min-heap of size K. If heap size exceeds K, pop the root. The heap will contain exactly the K largest elements.",
          implementationTipsPlaceholder: [
            "Use min-heaps for 'largest' queries, and max-heaps for 'smallest' queries",
            "Heapify input arrays in-place in O(N) rather than O(N log N) item-by-item insertions"
          ],
          commonMistakesPlaceholder: [
            "Storing all elements in the heap, causing O(N log N) time and O(N) space.",
            "Incorrectly index child nodes in array-based binary trees."
          ],
          linkedPracticeProblems: [
            {
              id: 1901,
              title: "Kth Largest Element in an Array",
              difficulty: "Medium",
              pattern: "Min Heap",
              link: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
            },
            {
              id: 1902,
              title: "Find Median from Data Stream",
              difficulty: "Hard",
              pattern: "Two Heaps",
              link: "https://leetcode.com/problems/find-median-from-data-stream/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default heap;
