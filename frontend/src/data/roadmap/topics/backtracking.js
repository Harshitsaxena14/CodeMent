const backtracking = {
  id: 12,
  topicId: "backtracking",
  title: "Backtracking",
  description: "Brute-force state space exploration. Pruning invalid coordinate paths, tracking state resets, and backtracking recursion choices.",
  estimatedTime: "6 Hours",
  difficulty: "Hard",
  prerequisites: ["recursion"],
  learningObjectives: ["Understand state pruning", "Evaluate recursion choice trees"],
  modules: [
    {
      id: "mod-backtracking-trees",
      title: "State Prunings",
      order: 1,
      shortDescription: "Discard invalid branch paths early to save execution time.",
      estimatedTime: "90 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-backtracking-nqueens",
          title: "Decision Trees Pruning",
          learningObjective: "Prune candidate paths in N-Queens style constraints checks.",
          estimatedDuration: "45 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Evaluate branch legality. Reset grid coordinates state immediately on return cycles.",
          implementationTipsPlaceholder: ["Use boolean arrays to map column and diagonal attacks flags"],
          commonMistakesPlaceholder: ["Forgetting to clear or undo state changes during returns"],
          linkedPracticeProblems: [
            { id: "bt1", title: "N-Queens", difficulty: "Hard", pattern: "Backtracking", link: "https://leetcode.com/problems/n-queens/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default backtracking;
