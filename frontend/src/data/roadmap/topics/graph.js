const graph = {
  id: 8,
  topicId: "graph",
  title: "Graphs",
  description: "Nodes and edges representation. Master DFS/BFS traversals, cycle checks, topological sorting, Kahn's algorithm, shortest paths (Dijkstra, Bellman-Ford, Floyd-Warshall), and MSTs.",
  estimatedTime: "8 Hours",
  difficulty: "Hard",
  prerequisites: ["basics", "recursion", "queue"],
  learningObjectives: [
    "Represent networks as adjacency lists or matrices",
    "Find shortest path ranges using BFS or Dijkstra",
    "Identify cycle paths in graphs recursively"
  ],
  concepts: ["DFS / BFS", "Topological Sort", "Shortest Path Algorithms"],
  modules: [
    {
      id: "mod-graph-basics",
      title: "Representations & Traversals",
      order: 1,
      shortDescription: "Build network models and traverse them depth-wise or breadth-wise.",
      estimatedTime: "240 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-graph-dfs",
          title: "Adjacency Traversals",
          learningObjective: "Implement DFS and BFS traversals over graph adjacency lists.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Graphs represent connections (edges) between items (vertices). Store graphs as adjacency lists to optimize space. Traverse graphs using depth first search (DFS, recursive stack) or breadth first search (BFS, FIFO queue), keeping a 'visited' set to prevent infinite loops from cycles.",
          implementationTipsPlaceholder: [
            "Always initialize a visited boolean array or Set to avoid infinite loop cycles",
            "Prefer adjacency lists over adjacency matrices for sparse graphs to save space"
          ],
          commonMistakesPlaceholder: [
            "Failing to track visited state, causing stack overflow errors in cyclic graphs.",
            "Incorrectly index nodes under zero-based vs one-based index schemas."
          ],
          linkedPracticeProblems: [
            {
              id: 801,
              title: "Clone Graph",
              difficulty: "Medium",
              pattern: "DFS HashMap",
              link: "https://leetcode.com/problems/clone-graph/"
            },
            {
              id: 802,
              title: "Number of Islands",
              difficulty: "Medium",
              pattern: "DFS Grid",
              link: "https://leetcode.com/problems/number-of-islands/"
            }
          ],
          completionState: false
        }
      ]
    },
    {
      id: "mod-graph-advanced",
      title: "Topological Sorting & Shortest Paths",
      order: 2,
      shortDescription: "Resolve dependency ordering and shortest routes over edge weights.",
      estimatedTime: "240 Mins",
      difficulty: "Hard",
      lessons: [
        {
          id: "lesson-graph-dijkstra",
          title: "Shortest Paths (Dijkstra)",
          learningObjective: "Evaluate shortest paths over weighted edges in O(E log V) using priority queues.",
          estimatedDuration: "45 Mins",
          difficulty: "Hard",
          prerequisiteLessons: ["lesson-graph-dfs"],
          conciseExplanationPlaceholder: "Dijkstra's algorithm finds the shortest path from a source to all nodes in a weighted graph. By maintaining a min-priority queue of shortest distances, it greedily relaxes edges from the node with the current minimum distance. Runtimes scale to O((V + E) log V).",
          implementationTipsPlaceholder: [
            "Verify edge weight non-negativity: Dijkstra fails on negative weights (use Bellman-Ford instead)",
            "Store pair nodes containing (distance, vertex) inside min-priority heaps"
          ],
          commonMistakesPlaceholder: [
            "Failing to update relaxation condition, executing redundant heap push operations.",
            "Applying Dijkstra to graphs with negative weights."
          ],
          linkedPracticeProblems: [
            {
              id: 803,
              title: "Network Delay Time",
              difficulty: "Medium",
              pattern: "Dijkstra Heap",
              link: "https://leetcode.com/problems/network-delay-time/"
            },
            {
              id: 804,
              title: "Course Schedule",
              difficulty: "Medium",
              pattern: "Topological Sort",
              link: "https://leetcode.com/problems/course-schedule/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default graph;
