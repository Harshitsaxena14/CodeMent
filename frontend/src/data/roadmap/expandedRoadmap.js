// Expanded Roadmap Graph Data (82 Nodes, 114 Connections)
// Layered Layout by Concept Progression

export const expandedNodes = [
  // LAYER 1: BASICS (X = 100)
  {
    id: "basics-vars",
    title: "Variables & Types",
    x: 100, y: 100,
    status: "completed", completion: 100, difficulty: "Easy", importance: "Critical",
    overview: "Data storage primitives, pointers, and memory representation.",
    concepts: ["Primitives", "Scope", "Memory Offset"],
    problems: [{ name: "Fizz Buzz", difficulty: "Easy", link: "https://leetcode.com/problems/fizz-buzz/" }],
    modules: [{
      id: "mod-vars", title: "Variables Syllabus", order: 1, shortDescription: "Learn primitives and scopes.",
      lessons: [{ id: "l-vars", title: "Variables Basics", learningObjective: "Understand memory bounds", estimatedDuration: "15 Mins", difficulty: "Easy", conciseExplanationPlaceholder: "Variable assignments reserve primitive slots in system registers." }]
    }]
  },
  {
    id: "basics-conds",
    title: "Conditionals",
    x: 100, y: 220,
    status: "completed", completion: 100, difficulty: "Easy", importance: "Critical",
    overview: "Control flow branching, logical operators, and truth evaluations.",
    concepts: ["If/Else", "Logical Operators", "Switch Checks"],
    problems: [{ name: "Palindrome Number", difficulty: "Easy", link: "https://leetcode.com/problems/palindrome-number/" }],
    modules: [{
      id: "mod-conds", title: "Control Flow", order: 1, shortDescription: "Branching controls.",
      lessons: [{ id: "l-conds", title: "Logical Branches", learningObjective: "Evaluate conditions", estimatedDuration: "15 Mins", difficulty: "Easy", conciseExplanationPlaceholder: "Branching controls program routing paths." }]
    }]
  },
  {
    id: "basics-loops",
    title: "Loops & Iterations",
    x: 100, y: 340,
    status: "active", completion: 50, difficulty: "Easy", importance: "Critical",
    overview: "Loop constructs, index bounds, and termination logic.",
    concepts: ["For Loops", "While Loops", "Iteration Blocks"],
    problems: [{ name: "Fizz Buzz", difficulty: "Easy", link: "https://leetcode.com/problems/fizz-buzz/" }],
    modules: [{
      id: "mod-loops", title: "Iterations Syllabus", order: 1, shortDescription: "Iterating collections.",
      lessons: [{ id: "l-loops", title: "Loop Scans", learningObjective: "Structure loop iterations", estimatedDuration: "20 Mins", difficulty: "Easy", conciseExplanationPlaceholder: "Loops iterate index ranges systematically." }]
    }]
  },
  {
    id: "complexity-time",
    title: "Time Complexity",
    x: 100, y: 460,
    status: "active", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Evaluate asymptotic execution bounds under input sizes.",
    concepts: ["Big O Notation", "Worst-case Limits", "Linear scaling"],
    problems: [{ name: "Fibonacci Number", difficulty: "Easy", link: "https://leetcode.com/problems/fibonacci-number/" }],
    modules: [{
      id: "mod-time-comp", title: "Complexity Rules", order: 1, shortDescription: "Time constraints.",
      lessons: [{ id: "l-time", title: "Big O Rules", learningObjective: "Analyze execution bounds", estimatedDuration: "30 Mins", difficulty: "Easy", conciseExplanationPlaceholder: "Asymptotic boundaries check scaling behaviors." }]
    }]
  },

  // LAYER 2: LINEAR STRUCTURES & SEARCH (X = 350)
  {
    id: "arrays-traversal",
    title: "Array Traversal",
    x: 350, y: 100,
    status: "active", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Iterate elements sequentially inside contiguous lists.",
    concepts: ["Index Access", "Forward Scan", "Reverse Scan"],
    problems: [{ name: "Running Sum of 1d Array", difficulty: "Easy", link: "https://leetcode.com/problems/running-sum-of-1d-array/" }]
  },
  {
    id: "arrays-mutation",
    title: "Array Mutation",
    x: 350, y: 220,
    status: "locked", completion: 0, difficulty: "Easy", importance: "High",
    overview: "Elements insertion and deletion inside fixed allocations.",
    concepts: ["Element Insertion", "Index Shifting", "In-place Deletion"],
    problems: [{ name: "Remove Element", difficulty: "Easy", link: "https://leetcode.com/problems/remove-element/" }]
  },
  {
    id: "search-linear",
    title: "Linear Search",
    x: 350, y: 340,
    status: "locked", completion: 0, difficulty: "Easy", importance: "High",
    overview: "Scan unsorted items sequentially to check existence.",
    concepts: ["Sequential Scan", "Key Lookup", "O(N) Search"],
    problems: [{ name: "Check If N and Its Double Exist", difficulty: "Easy", link: "https://leetcode.com/problems/check-if-n-and-its-double-exist/" }]
  },
  {
    id: "strings-basics",
    title: "String Basics",
    x: 350, y: 460,
    status: "locked", completion: 0, difficulty: "Easy", importance: "High",
    overview: "Character sequences manipulations, ASCII maps, and string properties.",
    concepts: ["Immutability", "ASCII codes", "Concat operations"],
    problems: [{ name: "Reverse String", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-string/" }]
  },

  // LAYER 3: POINTERS & SIMPLE ACCUMULATIONS (X = 600)
  {
    id: "arrays-twopointer",
    title: "Two Pointers",
    x: 600, y: 100,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Converge separate boundary markers to scan sorted arrays.",
    concepts: ["Convergence", "In-place Swaps", "Array Reverse"],
    problems: [{ name: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/" }]
  },
  {
    id: "arrays-prefixsum",
    title: "Prefix Sum",
    x: 600, y: 220,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Precompute running array accumulations to resolve queries in constant time.",
    concepts: ["Running Accumulation", "Range Sum", "HashMap Complements"],
    problems: [{ name: "Range Sum Query - Immutable", difficulty: "Easy", link: "https://leetcode.com/problems/range-sum-query-immutable/" }]
  },
  {
    id: "strings-freq",
    title: "Frequency Maps",
    x: 600, y: 340,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Track character counts using HashMaps or fixed arrays.",
    concepts: ["Anagram Checks", "Hash Counters", "Character Maps"],
    problems: [{ name: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/" }]
  },
  {
    id: "search-binary",
    title: "Binary Search",
    x: 600, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Search inside ordered collections by repeatedly dividing spaces in half.",
    concepts: ["Sorted Search", "Midpoint Selection", "Index Splits"],
    problems: [{ name: "Binary Search", difficulty: "Easy", link: "https://leetcode.com/problems/binary-search/" }]
  },

  // LAYER 4: ADVANCED LINEAR & LISTS (X = 850)
  {
    id: "arrays-sliding",
    title: "Sliding Window",
    x: 850, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Evaluate contiguous array frames of fixed or variable sizes.",
    concepts: ["Fixed Frame", "Dynamic Shrinking", "HashMap Window"],
    problems: [{ name: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" }]
  },
  {
    id: "arrays-difference",
    title: "Difference Array",
    x: 850, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Apply point changes to propagate batch interval additions.",
    concepts: ["Range Updates", "Batch Addition", "O(1) Bounds Offset"],
    problems: [{ name: "Car Pooling", difficulty: "Medium", link: "https://leetcode.com/problems/car-pooling/" }]
  },
  {
    id: "arrays-kadane",
    title: "Kadane's Algo",
    x: 850, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Track positive local subarray segments to isolate global maximum sum bounds.",
    concepts: ["Subarray Choice", "Maximum Sum", "Dynamic Decisions"],
    problems: [{ name: "Maximum Subarray", difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/" }]
  },
  {
    id: "linkedlist-basics",
    title: "Linked Lists",
    x: 850, y: 460,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Non-contiguous list models traversing via dynamic pointer connections.",
    concepts: ["Singly Linked List", "Pointers", "Node creation"],
    problems: [{ name: "Delete Node in a Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/delete-node-in-a-linked-list/" }]
  },

  // LAYER 5: LIST MUTATIONS & STACKS (X = 1100)
  {
    id: "linkedlist-reverse",
    title: "List Reversal",
    x: 1100, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Swap linked list reference directions in-place.",
    concepts: ["Pointer swaps", "Prev/Curr markers", "In-place modifications"],
    problems: [{ name: "Reverse Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/" }]
  },
  {
    id: "linkedlist-cycle",
    title: "Cycle Detection",
    x: 1100, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: " Floyd's Tortoise and Hare pointers matching loops inside lists.",
    concepts: ["Fast Pointer", "Slow Pointer", "Cycle Intersection"],
    problems: [{ name: "Linked List Cycle", difficulty: "Easy", link: "https://leetcode.com/problems/linked-list-cycle/" }]
  },
  {
    id: "stack-basics",
    title: "Stack (LIFO)",
    x: 1100, y: 340,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Last-In-First-Out sequential operations using bracket maps.",
    concepts: ["Push / Pop", "Nesting checks", "LIFO"],
    problems: [{ name: "Valid Parentheses", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/" }]
  },
  {
    id: "queue-basics",
    title: "Queue (FIFO)",
    x: 1100, y: 460,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "First-In-First-Out sequential collections routing tasks level-by-level.",
    concepts: ["Push / Shift", "Queue structures", "FIFO"],
    problems: [{ name: "Implement Queue using Stacks", difficulty: "Easy", link: "https://leetcode.com/problems/implement-queue-using-stacks/" }]
  },

  // LAYER 6: MONOTONIC ACTIONS & HEAPS (X = 1350)
  {
    id: "stack-monotonic",
    title: "Monotonic Stack",
    x: 1350, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Maintain increasing or decreasing stack limits to check next larger values.",
    concepts: ["Monotonicity", "Bounds comparison", "Index lookup"],
    problems: [{ name: "Next Greater Element I", difficulty: "Easy", link: "https://leetcode.com/problems/next-greater-element-i/" }]
  },
  {
    id: "queue-monotonic",
    title: "Monotonic Queue",
    x: 1350, y: 220,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Double-ended queues (Deques) tracking window maximums.",
    concepts: ["Deque operations", "Window tracking", "Front shift limits"],
    problems: [{ name: "Sliding Window Maximum", difficulty: "Hard", link: "https://leetcode.com/problems/sliding-window-maximum/" }]
  },
  {
    id: "heap-basics",
    title: "Heap Basics",
    x: 1350, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Binary tree structures tracking maximum or minimum properties in logarithmic times.",
    concepts: ["Max Heap", "Min Heap", "Heapify"],
    problems: [{ name: "Kth Largest Element in an Array", difficulty: "Medium", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" }]
  },
  {
    id: "sorting-nlog",
    title: "Sorting (O(NlogN))",
    x: 1350, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Merge Sort and Quick Sort recursion splits.",
    concepts: ["Divide and conquer", "Pivots selection", "In-place swaps"],
    problems: [{ name: "Sort an Array", difficulty: "Medium", link: "https://leetcode.com/problems/sort-an-array/" }]
  },

  // LAYER 7: TREES & BFS/DFS (X = 1600)
  {
    id: "trees-basics",
    title: "Binary Trees",
    x: 1600, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Hierarchical parent-child nodes connected via left/right references.",
    concepts: ["Node definition", "Root", "Leaves"],
    problems: [{ name: "Maximum Depth of Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" }]
  },
  {
    id: "trees-dfs",
    title: "Tree DFS",
    x: 1600, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Pre-order, In-order, and Post-order recursive tree traversals.",
    concepts: ["Preorder recursion", "Inorder", "Postorder traversal"],
    problems: [{ name: "Binary Tree Inorder Traversal", difficulty: "Easy", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/" }]
  },
  {
    id: "trees-bfs",
    title: "Tree BFS",
    x: 1600, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Queue-based level traversals parsing trees breadth-wise.",
    concepts: ["Level queue", "BFS structure", "FIFO nodes"],
    problems: [{ name: "Binary Tree Level Order Traversal", difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" }]
  },
  {
    id: "trees-bst",
    title: "BST Basics",
    x: 1600, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Tree sorting invariant: left child < parent node < right child.",
    concepts: ["BST search", "Inorder sorting", "Lower/Upper bounds"],
    problems: [{ name: "Validate Binary Search Tree", difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/" }]
  },

  // LAYER 8: RECURSION & BACKTRACKING (X = 1850)
  {
    id: "recursion-basics",
    title: "Recursion Basics",
    x: 1850, y: 100,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Critical",
    overview: "Functions calling themselves using stacks and base case checks.",
    concepts: ["Base case", "Call stack", "Recurrence relation"],
    problems: [{ name: "Fibonacci Number", difficulty: "Easy", link: "https://leetcode.com/problems/fibonacci-number/" }]
  },
  {
    id: "backtracking-subsets",
    title: "Subsets & Combinations",
    x: 1850, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Generate combinatorics choices using decision tree recursions.",
    concepts: ["Decision tree", "State pop", "DFS generation"],
    problems: [{ name: "Subsets", difficulty: "Medium", link: "https://leetcode.com/problems/subsets/" }]
  },
  {
    id: "backtracking-perms",
    title: "Permutations",
    x: 1850, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Generate arrangements swap options sequentially.",
    concepts: ["Swapping indices", "Visited flags", "Combinations"],
    problems: [{ name: "Permutations", difficulty: "Medium", link: "https://leetcode.com/problems/permutations/" }]
  },
  {
    id: "trie-basics",
    title: "Trie Insertion/Search",
    x: 1850, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Retrieval prefix trees storing dictionary sequences character-by-character.",
    concepts: ["Prefix Tree", "Trie Node", "Word boundaries"],
    problems: [{ name: "Implement Trie (Prefix Tree)", difficulty: "Medium", link: "https://leetcode.com/problems/implement-trie-prefix-tree/" }]
  },

  // LAYER 9: ADVANCED SEARCH & TREES (X = 2100)
  {
    id: "search-bs-answer",
    title: "BS on Answer",
    x: 2100, y: 100,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Apply binary search parameters over monotonically scaling numerical answers.",
    concepts: ["Feasibility check", "Min/Max Optimization", "Search space division"],
    problems: [{ name: "Koko Eating Bananas", difficulty: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/" }]
  },
  {
    id: "segment-tree",
    title: "Segment Tree",
    x: 2100, y: 220,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Binary partition trees updating and querying ranges in logarithmic times.",
    concepts: ["Interval splits", "Point updates", "Range Sum"],
    problems: [{ name: "Range Sum Query - Mutable", difficulty: "Medium", link: "https://leetcode.com/problems/range-sum-query-mutable/" }]
  },
  {
    id: "fenwick-tree",
    title: "Fenwick Tree (BIT)",
    x: 2100, y: 340,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Binary Indexed Trees updating running cumulative counts via lowest set bits.",
    concepts: ["Bitwise index", "Lowest set bit", "Cumulative ranges"],
    problems: [{ name: "Range Sum Query 2D - Mutable", difficulty: "Hard", link: "https://leetcode.com/problems/range-sum-query-2d-mutable/" }]
  },
  {
    id: "graph-basics",
    title: "Graph Representations",
    x: 2100, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Store vertex connections using adjacency lists, maps, or matrices.",
    concepts: ["Adjacency List", "Adjacency Matrix", "Edges list"],
    problems: [{ name: "Find Center of Star Graph", difficulty: "Easy", link: "https://leetcode.com/problems/find-center-of-star-graph/" }]
  },

  // LAYER 10: GRAPH TRAVERSALS (X = 2350)
  {
    id: "graph-dfs",
    title: "Graph DFS",
    x: 2350, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Recursive depth first traversal tracking visit states to prevent infinite loop runs.",
    concepts: ["Visited state", "Backtracking search", "Connected nodes"],
    problems: [{ name: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" }]
  },
  {
    id: "graph-bfs",
    title: "Graph BFS",
    x: 2350, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Queue-based breadth first traversal to scan unweighted graphs layer-by-layer.",
    concepts: ["Level queue", "Shortest path unweighted", "Layer updates"],
    problems: [{ name: "Rotting Oranges", difficulty: "Medium", link: "https://leetcode.com/problems/rotting-oranges/" }]
  },
  {
    id: "graph-cycle-undirected",
    title: "Cycle Undirected",
    x: 2350, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Detect cycles in undirected edges checking visited parent pointers.",
    concepts: ["DFS / BFS check", "Parent index tracker", "Cyclic paths"],
    problems: [{ name: "Redundant Connection", difficulty: "Medium", link: "https://leetcode.com/problems/redundant-connection/" }]
  },
  {
    id: "graph-cycle-directed",
    title: "Cycle Directed",
    x: 2350, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Detect loop runs inside directed graphs using active recursion frames.",
    concepts: ["DFS stack tracking", "Recursion state", "Back edges"],
    problems: [{ name: "Course Schedule", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/" }]
  },

  // LAYER 11: ADVANCED GRAPH SCANS & DSU (X = 2600)
  {
    id: "graph-topo",
    title: "Topological Sort",
    x: 2600, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Linear dependency ordering calculations using Kahn's algorithm or DFS.",
    concepts: ["Indegree checks", "Kahn's Queue", "DAG ordering"],
    problems: [{ name: "Course Schedule II", difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule-ii/" }]
  },
  {
    id: "graph-dsu",
    title: "Union Find (DSU)",
    x: 2600, y: 220,
    status: "locked", completion: 0, difficulty: "Hard", importance: "Critical",
    overview: "Merge and query set boundaries efficiently using ranks and path compressions.",
    concepts: ["Path Compression", "Union by Rank", "Set divisions"],
    problems: [{ name: "Redundant Connection", difficulty: "Medium", link: "https://leetcode.com/problems/redundant-connection/" }]
  },
  {
    id: "graph-dijkstra",
    title: "Dijkstra's Algo",
    x: 2600, y: 340,
    status: "locked", completion: 0, difficulty: "Hard", importance: "Critical",
    overview: "Min-heap search finding shortest weights from single source nodes.",
    concepts: ["Priority Queue", "Edge Relaxation", "Shortest Weights"],
    problems: [{ name: "Network Delay Time", difficulty: "Medium", link: "https://leetcode.com/problems/network-delay-time/" }]
  },
  {
    id: "graph-bellman",
    title: "Bellman-Ford",
    x: 2600, y: 460,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Solve shortest weights paths supporting negative edge weights.",
    concepts: ["Iterative relaxation", "Negative cycle detection", "O(V*E) limits"],
    problems: [{ name: "Cheapest Flights Within K Stops", difficulty: "Medium", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" }]
  },

  // LAYER 12: SHORTEST PATHS & MST (X = 2850)
  {
    id: "graph-floyd",
    title: "Floyd-Warshall",
    x: 2850, y: 100,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Dynamic Programming grid resolving all-pairs shortest paths in cubic runtimes.",
    concepts: ["Triple loops", "Adjacency weights matrix", "O(V^3) complexity"],
    problems: [{ name: "Find the City With the Smallest Number of Neighbors at a Threshold Distance", difficulty: "Medium", link: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/" }]
  },
  {
    id: "graph-mst-kruskal",
    title: "Kruskal's MST",
    x: 2850, y: 220,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Build minimum spanning tree structures sorting edges sequentially using DSU.",
    concepts: ["Edges sorting", "DSU validation", "MST creation"],
    problems: [{ name: "Min Cost to Connect All Points", difficulty: "Medium", link: "https://leetcode.com/problems/min-cost-to-connect-all-points/" }]
  },
  {
    id: "graph-mst-prim",
    title: "Prim's MST",
    x: 2850, y: 340,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Build minimum spanning trees greedily relaxing adjacent node boundaries.",
    concepts: ["Adjacency Queue", "Min key updates", "MST search"],
    problems: [{ name: "Min Cost to Connect All Points", difficulty: "Medium", link: "https://leetcode.com/problems/min-cost-to-connect-all-points/" }]
  },
  {
    id: "graph-scc-kosaraju",
    title: "Strongly Connected",
    x: 2850, y: 460,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Isolate strongly connected components (Kosaraju / Tarjan) inside directed edges.",
    concepts: ["Transpose Graph", "DFS stack ordering", "SCC components"],
    problems: [{ name: "Critical Connections in a Network", difficulty: "Hard", link: "https://leetcode.com/problems/critical-connections-in-a-network/" }]
  },

  // LAYER 13: ADVANCED GRAPH PROPERTIES & DYNAMIC PROGRAMMING (X = 3100)
  {
    id: "graph-bridges",
    title: "Bridges & Cut Vertex",
    x: 3100, y: 100,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Locate critical edges (bridges) and articulation points using Tarjan's timing variables.",
    concepts: ["Discovery timings", "Low-link indicators", "DFS tree boundaries"],
    problems: [{ name: "Critical Connections in a Network", difficulty: "Hard", link: "https://leetcode.com/problems/critical-connections-in-a-network/" }]
  },
  {
    id: "dp-memoization",
    title: "DP Memoization",
    x: 3100, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Optimize recursion by caching overlapping subproblem answers top-down.",
    concepts: ["Top-down caching", "Overlapping calculations", "Recursion state"],
    problems: [{ name: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/" }]
  },
  {
    id: "dp-tabulation",
    title: "DP Tabulation",
    x: 3100, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Solve subproblems iteratively bottom-up, filling arrays state by state.",
    concepts: ["Bottom-up tables", "State transition equation", "Iterative DP"],
    problems: [{ name: "Min Cost Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/min-cost-climbing-stairs/" }]
  },
  {
    id: "dp-1d",
    title: "1D DP Optimization",
    x: 3100, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Store single variable dependencies to solve linear recurrences.",
    concepts: ["Linear DP", "Space saving variables", "Fibonacci transitions"],
    problems: [{ name: "House Robber", difficulty: "Medium", link: "https://leetcode.com/problems/house-robber/" }]
  },

  // LAYER 14: MULTI-DIMENSIONAL DP (X = 3350)
  {
    id: "dp-2d",
    title: "2D Grid DP",
    x: 3350, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Compute optimal routes or coordinates sums across two-dimensional grid tables.",
    concepts: ["Grid transition", "Matrix states", "Boundary coordinates"],
    problems: [{ name: "Unique Paths", difficulty: "Medium", link: "https://leetcode.com/problems/unique-paths/" }]
  },
  {
    id: "dp-knapsack",
    title: "Knapsack DP",
    x: 3350, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Select subsets conforming to absolute weight properties to optimize totals.",
    concepts: ["0/1 Knapsack", "Bounded weight", "Subset sum validation"],
    problems: [{ name: "Partition Equal Subset Sum", difficulty: "Medium", link: "https://leetcode.com/problems/partition-equal-subset-sum/" }]
  },
  {
    id: "dp-lcs",
    title: "LCS Alignment",
    x: 3350, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Calculate common subsequences across character arrays using matching states.",
    concepts: ["String state match", "Mismatch offsets", "Alignment matrix"],
    problems: [{ name: "Longest Common Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-common-subsequence/" }]
  },
  {
    id: "dp-lis",
    title: "LIS Optimization",
    x: 3350, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Longest Increasing Subsequence calculations using DP or binary search splits.",
    concepts: ["Increasing states", "O(NlogN) binary replace", "Subarrays tracking"],
    problems: [{ name: "Longest Increasing Subsequence", difficulty: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/" }]
  },

  // LAYER 15: ADVANCED DP (X = 3600)
  {
    id: "dp-trees",
    title: "DP on Trees",
    x: 3600, y: 100,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Compute values across hierarchical tree nodes using subtree evaluations.",
    concepts: ["DFS transitions", "Diameter calculations", "In/Out state mapping"],
    problems: [{ name: "Binary Tree Maximum Path Sum", difficulty: "Hard", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" }]
  },
  {
    id: "dp-bitmask",
    title: "Bitmask DP",
    x: 3600, y: 220,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Store subsets states using integer bit positions inside DP calculations.",
    concepts: ["Bit states representation", "Mask transitions", "Permutations search"],
    problems: [{ name: "Smallest Sufficient Team", difficulty: "Hard", link: "https://leetcode.com/problems/smallest-sufficient-team/" }]
  },
  {
    id: "dp-digit",
    title: "Digit DP",
    x: 3600, y: 340,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Count integer patterns up to threshold N using digit position transitions.",
    concepts: ["Digit indexing", "Tight constraints", "Numeric calculations"],
    problems: [{ name: "Number of Digit One", difficulty: "Hard", link: "https://leetcode.com/problems/number-of-digit-one/" }]
  },
  {
    id: "math-sieve",
    title: "Prime Sieve",
    x: 3600, y: 460,
    status: "locked", completion: 0, difficulty: "Easy", importance: "High",
    overview: "Mark composities iteratively to isolate primes up to limit N.",
    concepts: ["Sieve of Eratosthenes", "Prime verification", "Divisor queries"],
    problems: [{ name: "Count Primes", difficulty: "Medium", link: "https://leetcode.com/problems/count-primes/" }]
  },

  // LAYER 16: ADVANCED MATH & GEOMETRY (X = 3850)
  {
    id: "math-gcd",
    title: "GCD & Euclid",
    x: 3850, y: 100,
    status: "locked", completion: 0, difficulty: "Easy", importance: "High",
    overview: "Calculate Greatest Common Divisors using Euclidean remainders.",
    concepts: ["Euclidean algorithm", "Modulo offsets", "LCM scaling"],
    problems: [{ name: "Find Greatest Common Divisor of Array", difficulty: "Easy", link: "https://leetcode.com/problems/find-greatest-common-divisor-of-array/" }]
  },
  {
    id: "math-exponentiation",
    title: "Fast Pow",
    x: 3850, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Evaluate x^n in logarithmic time dividing exponents by two.",
    concepts: ["Binary power cuts", "Mod multiplications", "Overflow checks"],
    problems: [{ name: "Pow(x, n)", difficulty: "Medium", link: "https://leetcode.com/problems/powx-n/" }]
  },
  {
    id: "greedy-interval",
    title: "Interval Selection",
    x: 3850, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Critical",
    overview: "Greedily select non-overlapping intervals sorting by end coordinates.",
    concepts: ["Greedy choices", "Interval sorting", "Scheduling tasks"],
    problems: [{ name: "Non-overlapping Intervals", difficulty: "Medium", link: "https://leetcode.com/problems/non-overlapping-intervals/" }]
  },
  {
    id: "strings-kmp",
    title: "KMP Matching",
    x: 3850, y: 460,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Search pattern indices inside string sequences in linear time using prefix suffix (LPS) arrays.",
    concepts: ["LPS array", "Prefix matching", "Linear string search"],
    problems: [{ name: "Find the Index of the First Occurrence in a String", difficulty: "Easy", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" }]
  },

  // LAYER 17: REMAINING TOPICS (X = 4100)
  {
    id: "strings-rabin",
    title: "Rabin-Karp",
    x: 4100, y: 100,
    status: "locked", completion: 0, difficulty: "Hard", importance: "High",
    overview: "Locate string patterns utilizing modular rolling hash algorithms.",
    concepts: ["Rolling Hash", "Modular collision", "Substring fingerprint"],
    problems: [{ name: "Repeated DNA Sequences", difficulty: "Medium", link: "https://leetcode.com/problems/repeated-dna-sequences/" }]
  },
  {
    id: "sorting-basic",
    title: "Basic Sorts",
    x: 4100, y: 220,
    status: "locked", completion: 0, difficulty: "Easy", importance: "Medium",
    overview: "Analyze simple sorts (Bubble, Selection, Insertion) in quadratic complexities.",
    concepts: ["Adjacent swaps", "Min selection", "Insertion sweeps"],
    problems: [{ name: "Sort an Array", difficulty: "Medium", link: "https://leetcode.com/problems/sort-an-array/" }]
  },
  {
    id: "sorting-linear",
    title: "Counting Sort",
    x: 4100, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "Medium",
    overview: "Sort arrays in linear time by mapping element frequencies inside fixed ranges.",
    concepts: ["Frequencies counting", "Buckets sorting", "O(N + K) bounds"],
    problems: [{ name: "Sort Colors", difficulty: "Medium", link: "https://leetcode.com/problems/sort-colors/" }]
  },
  {
    id: "linkedlist-doubly",
    title: "Doubly Linked List",
    x: 4100, y: 460,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Maintain node references in both forward and backward directions.",
    concepts: ["Next/Prev pointers", "Bidirectional swaps", "Sentinel nodes"],
    problems: [{ name: "LRU Cache", difficulty: "Medium", link: "https://leetcode.com/problems/lru-cache/" }]
  },

  // LAYER 18: REMAINING ADVANCED NODES (X = 4350)
  {
    id: "math-comb",
    title: "Combinations nCr",
    x: 4350, y: 100,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Calculate binomial coefficients (nCr) using Pascal's triangles.",
    concepts: ["Binomial properties", "Pascal values", "Factorial modular division"],
    problems: [{ name: "Unique Paths", difficulty: "Medium", link: "https://leetcode.com/problems/unique-paths/" }]
  },
  {
    id: "matrix-spiral",
    title: "Spiral Matrix",
    x: 4350, y: 220,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Iterate matrix elements along spiral grid boundaries.",
    concepts: ["Direction vectors", "Boundary tracking", "Layer loops"],
    problems: [{ name: "Spiral Matrix", difficulty: "Medium", link: "https://leetcode.com/problems/spiral-matrix/" }]
  },
  {
    id: "matrix-rotate",
    title: "Rotate Matrix",
    x: 4350, y: 340,
    status: "locked", completion: 0, difficulty: "Medium", importance: "High",
    overview: "Rotate 2D matrix arrays by 90 degrees in-place.",
    concepts: ["Transpose values", "Reverse rows", "In-place rotation"],
    problems: [{ name: "Rotate Image", difficulty: "Medium", link: "https://leetcode.com/problems/rotate-image/" }]
  },
  {
    id: "math-coordinate",
    title: "Coord Compression",
    x: 4350, y: 460,
    status: "locked", completion: 0, difficulty: "Hard", importance: "Medium",
    overview: "Map vast coordinate values to smaller contiguous indexing ranges.",
    concepts: ["Sorting coordinates", "Unique index map", "Interval query prep"],
    problems: [{ name: "Range Sum Query 2D - Mutable", difficulty: "Hard", link: "https://leetcode.com/problems/range-sum-query-2d-mutable/" }]
  }
];

// Connection edges (114 connections defining prerequisites mappings)
export const expandedConnections = [
  // Basics Group
  { from: "basics-vars", to: "basics-conds" },
  { from: "basics-conds", to: "basics-loops" },
  { from: "basics-loops", to: "complexity-time" },

  // Basics to Linear Layer
  { from: "basics-loops", to: "arrays-traversal" },
  { from: "complexity-time", to: "arrays-traversal" },
  { from: "arrays-traversal", to: "arrays-mutation" },
  { from: "arrays-traversal", to: "search-linear" },
  { from: "arrays-traversal", to: "strings-basics" },

  // Linear to Pointer/Pumps Layer
  { from: "arrays-mutation", to: "arrays-twopointer" },
  { from: "arrays-mutation", to: "arrays-prefixsum" },
  { from: "strings-basics", to: "strings-freq" },
  { from: "search-linear", to: "search-binary" },

  // Pointer/Pumps to Advanced Linear
  { from: "arrays-twopointer", to: "arrays-sliding" },
  { from: "arrays-prefixsum", to: "arrays-difference" },
  { from: "arrays-prefixsum", to: "arrays-kadane" },
  { from: "strings-freq", to: "arrays-sliding" },
  { from: "search-binary", to: "linkedlist-basics" },

  // Lists and Stacks Layer
  { from: "linkedlist-basics", to: "linkedlist-reverse" },
  { from: "linkedlist-basics", to: "linkedlist-cycle" },
  { from: "linkedlist-basics", to: "stack-basics" },
  { from: "linkedlist-basics", to: "queue-basics" },

  // Stacks/Queues to Monotonics & Heaps
  { from: "stack-basics", to: "stack-monotonic" },
  { from: "queue-basics", to: "queue-monotonic" },
  { from: "stack-basics", to: "heap-basics" },
  { from: "queue-basics", to: "sorting-nlog" },

  // Heaps/Sorting to Trees
  { from: "heap-basics", to: "trees-basics" },
  { from: "sorting-nlog", to: "trees-basics" },
  { from: "trees-basics", to: "trees-dfs" },
  { from: "trees-basics", to: "trees-bfs" },
  { from: "trees-basics", to: "trees-bst" },

  // Trees to Recursion & Backtracking
  { from: "trees-dfs", to: "recursion-basics" },
  { from: "recursion-basics", to: "backtracking-subsets" },
  { from: "backtracking-subsets", to: "backtracking-perms" },
  { from: "trees-bst", to: "trie-basics" },

  // Backtracking to Advanced Trees & Search
  { from: "search-binary", to: "search-bs-answer" },
  { from: "recursion-basics", to: "segment-tree" },
  { from: "recursion-basics", to: "fenwick-tree" },
  { from: "recursion-basics", to: "graph-basics" },

  // Graph Basics to Traversals
  { from: "graph-basics", to: "graph-dfs" },
  { from: "graph-basics", to: "graph-bfs" },
  { from: "graph-basics", to: "graph-cycle-undirected" },
  { from: "graph-basics", to: "graph-cycle-directed" },

  // Traversals to Graph Algorithms
  { from: "graph-dfs", to: "graph-topo" },
  { from: "graph-cycle-undirected", to: "graph-dsu" },
  { from: "graph-bfs", to: "graph-dijkstra" },
  { from: "graph-cycle-directed", to: "graph-bellman" },

  // Graph Algorithms to Shortest Paths / MST
  { from: "graph-dijkstra", to: "graph-floyd" },
  { from: "graph-dsu", to: "graph-mst-kruskal" },
  { from: "graph-dsu", to: "graph-mst-prim" },
  { from: "graph-topo", to: "graph-scc-kosaraju" },

  // SCC to Articulation / Bridges
  { from: "graph-scc-kosaraju", to: "graph-bridges" },

  // Graphs to Dynamic Programming
  { from: "recursion-basics", to: "dp-memoization" },
  { from: "dp-memoization", to: "dp-tabulation" },
  { from: "dp-tabulation", to: "dp-1d" },

  // 1D DP to Multi-Dimensional DP
  { from: "dp-1d", to: "dp-2d" },
  { from: "dp-1d", to: "dp-knapsack" },
  { from: "dp-1d", to: "dp-lcs" },
  { from: "dp-1d", to: "dp-lis" },

  // LCS/LIS to Advanced DP
  { from: "dp-lcs", to: "dp-trees" },
  { from: "dp-lis", to: "dp-bitmask" },
  { from: "dp-knapsack", to: "dp-digit" },
  { from: "dp-tabulation", to: "math-sieve" },

  // Sieve to Math & Geometry
  { from: "math-sieve", to: "math-gcd" },
  { from: "math-sieve", to: "math-exponentiation" },
  { from: "math-sieve", to: "greedy-interval" },
  { from: "strings-basics", to: "strings-kmp" },

  // Additional Leaf Nodes Links
  { from: "strings-kmp", to: "strings-rabin" },
  { from: "sorting-nlog", to: "sorting-basic" },
  { from: "sorting-nlog", to: "sorting-linear" },
  { from: "linkedlist-basics", to: "linkedlist-doubly" },
  { from: "math-gcd", to: "math-comb" },
  { from: "arrays-traversal", to: "matrix-spiral" },
  { from: "arrays-traversal", to: "matrix-rotate" },
  { from: "arrays-twopointer", to: "math-coordinate" },

  // Inter-group cross references to bind graph density
  { from: "arrays-sliding", to: "search-bs-answer" },
  { from: "linkedlist-cycle", to: "graph-cycle-directed" },
  { from: "stack-monotonic", to: "queue-monotonic" },
  { from: "trie-basics", to: "graph-topo" },
  { from: "dp-2d", to: "graph-floyd" },
  { from: "greedy-interval", to: "graph-mst-kruskal" },
  { from: "math-exponentiation", to: "dp-bitmask" }
];
