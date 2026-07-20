const unionfind = {
  id: 24,
  topicId: "unionfind",
  title: "Disjoint Set Union",
  description: "Learn dynamic graph connectivity partition strategies, path compression optimizations, and rank union checks.",
  estimatedTime: "4 Hours",
  difficulty: "Hard",
  prerequisites: ["graph"],
  learningObjectives: [
    "Manage disjoint set union (DSU) collections to query connectivity states",
    "Identify cycle structures in undirected graph edges in near-constant time"
  ],
  concepts: ["Path Compression", "Union by Rank/Size", "Connectivity Queries"],
  modules: [
    {
      id: "mod-unionfind-basics",
      title: "Disjoint Partitions & Union Operations",
      order: 1,
      shortDescription: "Track group partitions and resolve connectivity indices in near O(1) time.",
      estimatedTime: "120 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-unionfind-cycle",
          title: "Cycle & Connection Tracking",
          learningObjective: "Write a Disjoint Set Union supporting path compression and union-by-rank, validating loop paths in O(alpha(N)) runtime.",
          estimatedDuration: "35 Mins",
          difficulty: "Hard",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Disjoint Set Union (DSU) partitions elements into non-overlapping groups. Find queries retrieve a group representative recursively. Union operations merge two groups. Applying path compression (flattening tree levels during finds) and union by rank (merging smaller trees under larger roots) reduces complexity to O(alpha(N)) amortized time.",
          implementationTipsPlaceholder: [
            "Always return parent[i] = find(parent[i]) to implement path compression",
            "Initialize parent array where each element points to itself initially"
          ],
          commonMistakesPlaceholder: [
            "Failing to execute path compression, degrading query runtimes to linear O(N).",
            "Merging parent indices directly without locating the actual root representatives first."
          ],
          linkedPracticeProblems: [
            {
              id: 2401,
              title: "Redundant Connection",
              difficulty: "Medium",
              pattern: "Union Find",
              link: "https://leetcode.com/problems/redundant-connection/"
            },
            {
              id: 2402,
              title: "Number of Connected Components in an Undirected Graph",
              difficulty: "Medium",
              pattern: "Union Find",
              link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default unionfind;
