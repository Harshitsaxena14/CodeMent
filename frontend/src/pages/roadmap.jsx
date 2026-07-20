import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import API from "../api/axios";
import { completeRoadmap } from "../data/roadmap/index.js";

const initialNodes = [
  {
    id: "arrays",
    title: "Arrays",
    x: 100,
    y: 220,
    status: "completed",
    completion: 100,
    difficulty: "Easy",
    aiConfidence: 94,
    importance: "Critical",
    prereqs: [],
    unlocks: ["hashing", "strings"],
    overview: "Fundamental contiguous memory structures. Master pointer iterations, boundary conditions, and sliding offsets.",
    concepts: [
      "Largest Element in Array",
      "Second Largest Element (No Sorting)",
      "Check if Array is Sorted",
      "Remove Duplicates in-place",
      "Left Rotate Array by One Place",
      "Left Rotate Array by D Places",
      "Move Zeros to End",
      "Linear Search Basics",
      "Union & Intersection of Two Sorted Arrays",
      "Find Missing Number",
      "Maximum Consecutive Ones",
      "Find Number that Appears Once",
      "Two Sum (Target Sum Pairs)",
      "Sort Array of 0s, 1s, and 2s (Dutch National Flag)",
      "Majority Element (> N/2 times) (Boyer-Moore)",
      "Kadane's Algorithm (Max Subarray Sum)",
      "Print Maximum Subarray Sum Indices",
      "Rearrange Array Elements by Sign",
      "Next Permutation (Lexicographical)",
      "Leaders in Array",
      "Longest Consecutive Sequence",
      "Set Matrix Zeros",
      "Rotate Matrix by 90 Degrees in-place",
      "Spiral Matrix Traversal",
      "Subarrays with Sum Equals K (Prefix Sum + Map)",
      "Pascal's Triangle (nCr generation)",
      "Majority Element II (> N/3 times)",
      "3-Sum Problem (Unique Triplets)",
      "4-Sum Problem (Unique Quadruplets)",
      "Merge Overlapping Intervals",
      "Merge Sorted Arrays Without Extra Space",
      "Find Repeating and Missing Number",
      "Count Inversions (Merge Sort based)",
      "Reverse Pairs (Double Indexing)",
      "Maximum Product Subarray",
      "Coordinate Compression"
    ],
    problems: [
      { name: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
      { name: "Move Zeroes", difficulty: "Easy", link: "https://leetcode.com/problems/move-zeroes/" }
    ],
    weakConcepts: [],
    aiRec: "Solid execution speeds. Ready to advance to sequence Hashing."
  },
  {
    id: "hashing",
    title: "Hashing",
    x: 320,
    y: 120,
    status: "completed",
    completion: 100,
    difficulty: "Easy",
    aiConfidence: 88,
    importance: "Critical",
    prereqs: ["arrays"],
    unlocks: ["binary-search", "trees"],
    overview: "Key-value indexing structures. Crucial for reducing search time complexities from linear O(N) to constant O(1).",
    concepts: [
      "Direct Address Tables (DAT)",
      "Hash Functions (Division, Multiplication)",
      "Open Addressing: Linear Probing",
      "Open Addressing: Quadratic Probing & Double Hashing",
      "Closed Addressing: Chaining (LinkedList buckets)",
      "Load Factor and Dynamic Rehashing Limits",
      "HashMap vs. HashSet Internals",
      "Frequency Counting & Character Maps",
      "Subarray Sum Equals K (Zero Sum Queries)",
      "Longest Subarray with Sum divisible by K",
      "Subarray with Given XOR (Prefix XOR Map)",
      "Longest Substring Without Repeating Characters",
      "Minimum Window Substring (HashMap Window)",
      "Design HashMap from Scratch",
      "Design HashSet from Scratch",
      "Consistent Hashing Principles"
    ],
    problems: [
      { name: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/" },
      { name: "Group Anagrams", difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" }
    ],
    weakConcepts: [],
    aiRec: "Excellent memory tradeoff usage. Keep reviewing hash collision bounds."
  },
  {
    id: "strings",
    title: "Strings",
    x: 320,
    y: 320,
    status: "active",
    completion: 60,
    difficulty: "Easy",
    aiConfidence: 74,
    importance: "High",
    prereqs: ["arrays"],
    unlocks: ["sliding-window", "trees", "dp"],
    overview: "Sequence parsing arrays. Master substring search, pattern matching algorithms, and anagram properties.",
    concepts: [
      "Reverse Words in String",
      "Largest Odd Number in String",
      "Longest Common Prefix",
      "Isomorphic Strings",
      "Rotate String Check (Cyclic shift)",
      "Valid Anagram Verification",
      "Sort Characters by Frequency",
      "Maximum Nesting Depth of Parentheses",
      "Roman to Integer & Integer to Roman",
      "String to Integer (atoi)",
      "Implement strstr (substring search)",
      "Substring with K Distinct Characters",
      "Longest Palindromic Substring",
      "Sum of Beauty of All Substrings",
      "Reverse Words in-place (word boundaries)",
      "Knuth-Morris-Pratt (KMP) (LPS Array)",
      "Rabin-Karp Rolling Hash Algorithm",
      "Z-Algorithm (Linear Pattern Matching)",
      "Manacher's Algorithm (Palindromic Substrings)",
      "Minimum Add to Make Parentheses Valid",
      "Parsing Boolean Expressions",
      "Count and Say"
    ],
    problems: [
      { name: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/" },
      { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" }
    ],
    weakConcepts: ["Substring slicing indexing offset errors"],
    aiRec: "Review sliding window bounds to resolve sliding offset limits."
  },
  {
    id: "binary-search",
    title: "Binary Search",
    x: 560,
    y: 80,
    status: "locked",
    completion: 0,
    difficulty: "Medium",
    aiConfidence: 0,
    importance: "High",
    prereqs: ["hashing"],
    unlocks: [],
    overview: "Logarithmic lookup mechanism inside ordered ranges. Solve non-trivial bounds searches and search-space cuts.",
    concepts: [
      "Iterative & Recursive Binary Search",
      "Lower Bound Implementation",
      "Upper Bound Implementation",
      "Search Insert Position",
      "Floor and Ceil in Sorted Array",
      "First and Last Occurrences of Key",
      "Count Occurrences of Key in Sorted Array",
      "Number of Times Sorted Array is Rotated",
      "Search in Rotated Sorted Array I (Unique)",
      "Search in Rotated Sorted Array II (Duplicates)",
      "Find Minimum in Rotated Sorted Array",
      "Single Element in Sorted Array (Odd-Even Indices)",
      "Find Peak Element (1D Peak)",
      "Find Square Root of Integer (Precision bounds)",
      "Find Nth Root of Integer (Floating Point Search)",
      "Koko Eating Bananas",
      "Minimum Days to Make M Bouquets",
      "Find Smallest Divisor Given Threshold",
      "Capacity to Ship Packages Within D Days",
      "Kth Missing Positive Number",
      "Aggressive Cows (Minimize Max Distance)",
      "Book Allocation Problem (Minimize Max Pages)",
      "Split Array Largest Sum (Equivalent to Books)",
      "Painter's Partition Problem",
      "Median of Two Sorted Arrays (Partitioning)",
      "Kth Element of Two Sorted Arrays",
      "Find Peak Element II (2D Grid Peak)"
    ],
    problems: [
      { name: "Search in Rotated Sorted Array", difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" }
    ],
    weakConcepts: [],
    aiRec: "Complete Strings node to balance array query concepts before starting."
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    x: 560,
    y: 400,
    status: "locked",
    completion: 0,
    difficulty: "Medium",
    aiConfidence: 0,
    importance: "High",
    prereqs: ["strings"],
    unlocks: [],
    overview: "Sub-segment subarray optimizations. Avoid repetitive inner loop iterations on contiguous sequences.",
    concepts: [
      "Max Sum Subarray of Size K (Fixed)",
      "First Negative Integer in Window K (Fixed)",
      "Count Occurrences of Anagrams (Fixed)",
      "Maximum of All Subarrays of Size K (Monotonic Deque)",
      "Longest Subarray with Sum K (Positive elements)",
      "Longest Subarray with Sum K (Negative elements)",
      "Longest Substring with K Unique Characters",
      "Longest Substring Without Repeating Characters",
      "Longest Repeating Character Replacement",
      "Max Consecutive Ones III (At most K flips)",
      "Binary Subarrays With Sum (Sum equals target)",
      "Subarrays with K Different Integers",
      "Fruit Into Baskets (Max 2 types)",
      "Minimum Window Subsequence",
      "Minimum Window Substring"
    ],
    problems: [
      { name: "Minimum Size Subarray Sum", difficulty: "Medium", link: "https://leetcode.com/problems/minimum-size-subarray-sum/" }
    ],
    weakConcepts: [],
    aiRec: "Complete String index patterns to initialize dynamic slide offsets."
  },
  {
    id: "trees",
    title: "Trees",
    x: 560,
    y: 220,
    status: "locked",
    completion: 0,
    difficulty: "Medium",
    aiConfidence: 0,
    importance: "Critical",
    prereqs: ["hashing", "strings"],
    unlocks: ["graphs"],
    overview: "Non-linear hierarchical nodes. Master post-order, pre-order, and level-order traversals, and BST properties.",
    concepts: [
      "Binary Tree Representation & Node structure",
      "Pre-order Traversal (Recursive & Iterative)",
      "In-order Traversal (Recursive & Iterative)",
      "Post-order Traversal (Recursive & Iterative)",
      "Level Order Traversal (Queue BFS)",
      "Morris Traversal (Inorder/Preorder - O(1) Space)",
      "Height / Maximum Depth of Binary Tree",
      "Check for Balanced Binary Tree (O(N) bottom-up)",
      "Diameter of Binary Tree",
      "Maximum Path Sum (Any node to any node)",
      "Identical Trees Check",
      "Zig-Zag Spiral Level Order Traversal",
      "Boundary Traversal (Anti-clockwise)",
      "Vertical Order Traversal (Column-based BFS/DFS)",
      "Top View of Binary Tree",
      "Bottom View of Binary Tree",
      "Left & Right View of Binary Tree",
      "Symmetric Trees Check",
      "Root to Node Path sequence",
      "Lowest Common Ancestor (LCA) of Binary Tree",
      "Maximum Width of Binary Tree",
      "Children Sum Property (Conversion & validation)",
      "All Nodes Distance K in Binary Tree",
      "Burn a Binary Tree (Leaf infection spread)",
      "Count Complete Tree Nodes (Logarithmic height checks)",
      "Construct Tree from Preorder & Inorder",
      "Construct Tree from Postorder & Inorder",
      "Serialize and Deserialize Binary Tree",
      "BST Property Verification",
      "Search in BST",
      "Insert Node in BST",
      "Delete Node in BST",
      "Find Ceil and Floor in BST",
      "Kth Smallest/Largest Element in BST",
      "LCA in BST",
      "Construct BST from Preorder",
      "Inorder Successor & Predecessor in BST",
      "Binary Tree to BST Conversion",
      "Merge Two BSTs",
      "Two Sum in BST (BST Iterator approach)",
      "Recover BST (Two swapped nodes correction)",
      "Largest BST in Binary Tree"
    ],
    problems: [
      { name: "Invert Binary Tree", difficulty: "Easy", link: "https://leetcode.com/problems/invert-binary-tree/" }
    ],
    weakConcepts: [],
    aiRec: "Prerequisites matched. Active topic Strings must be completed to unlock."
  },
  {
    id: "graphs",
    title: "Graphs",
    x: 780,
    y: 220,
    status: "locked",
    completion: 0,
    difficulty: "Medium",
    aiConfidence: 0,
    importance: "Critical",
    prereqs: ["trees"],
    unlocks: ["dp"],
    overview: "Networks of connected vertices. Solve grid traversals, topological mappings, and shortest path weights.",
    concepts: [
      "Adjacency Matrix & Adjacency List Representations",
      "Breadth First Search (BFS) Traversal",
      "Depth First Search (DFS) Traversal",
      "Connected Components (Undirected/Directed)",
      "Cycle Detection in Undirected Graph (BFS/DFS)",
      "Cycle Detection in Directed Graph (DFS Stack/Kahn's)",
      "Bipartite Graph Verification (DFS/BFS coloring)",
      "Topological Sort (DFS Stack method)",
      "Kahn's Algorithm (Topological Sort BFS Indegree)",
      "Course Schedule I & II (Deadlocks verification)",
      "Shortest Path in Unweighted Graph (BFS)",
      "Shortest Path in DAG (Topo-sort + edge relaxation)",
      "Dijkstra's Algorithm (Min-Heap / Priority Queue)",
      "Dijkstra's Algorithm (Set/Tree-Map tracking)",
      "Shortest Path in Grid / Maze Problems",
      "Bellman-Ford Algorithm (Relaxation + Negative Cycle Detection)",
      "Floyd-Warshall Algorithm (All-pairs shortest paths)",
      "Find City with Smallest Number of Neighbors",
      "Prim's Algorithm (MST Construction)",
      "Kruskal's Algorithm (MST via Sorted Edges)",
      "Disjoint Set Union (DSU) (Union by Rank & Size)",
      "Disjoint Set Union (DSU) (Path Compression)",
      "Number of Provinces (DFS/DSU matching)",
      "Number of Operations to Make Network Connected",
      "Most Stones Removed with Same Row or Column",
      "Accounts Merge (DSU application)",
      "Swimming in Rising Water",
      "Tarjan's Bridge-Finding Algorithm",
      "Articulation Points (Cut Vertices)",
      "Kosaraju's Algorithm (Strongly Connected Components)",
      "Eulerian Path & Eulerian Circuit",
      "Hamiltonian Path & Cycle"
    ],
    problems: [
      { name: "Number of Islands", difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" }
    ],
    weakConcepts: [],
    aiRec: "Locked node. Tree node must be completed first."
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    x: 1000,
    y: 320,
    status: "locked",
    completion: 0,
    difficulty: "Hard",
    aiConfidence: 0,
    importance: "Critical",
    prereqs: ["strings", "graphs"],
    unlocks: [],
    overview: "Optimization through overlapping subproblem caches. Master tabulation, memoization, and knapsack grids.",
    concepts: [
      "Recursion Space Optimization (Memoization vs Tabulation)",
      "Climbing Stairs (Linear transitions)",
      "Frog Jump (Min energy optimization)",
      "Frog Jump with K Distance Steps",
      "Maximum Sum of Non-Adjacent Elements (House Robber)",
      "House Robber II (Circular array choice)",
      "Ninja's Training (State-based action choices)",
      "Unique Paths on Grid (Matrix combinations count)",
      "Unique Paths II (Grid with obstacles)",
      "Minimum Path Sum in Grid",
      "Minimum Path Sum in Triangular Grid",
      "Maximum Path Sum in Matrix (Variable start/end)",
      "Cherry Pickup II (3D DP - two concurrent paths)",
      "Subset Sum Equals Target",
      "Partition Equal Subset Sum",
      "Partition Array Into Two Subsets with Min Difference",
      "Count Subsets with Sum Equals K",
      "Count Partitions with Given Difference",
      "0/1 Knapsack Problem (Space Optimization to 1D Array)",
      "Coin Change (Fewest coins count)",
      "Target Sum (Plus/Minus assignments)",
      "Coin Change II (Unique combinations count)",
      "Unbounded Knapsack",
      "Rod Cutting Problem",
      "Longest Common Subsequence (LCS) (Table construction)",
      "Print Longest Common Subsequence",
      "Longest Common Substring",
      "Longest Palindromic Subsequence",
      "Minimum insertions to make string palindrome",
      "Minimum Insertions/Deletions to Convert String A to String B",
      "Shortest Common Supersequence",
      "Distinct Subsequences count",
      "Edit Distance (Insert, Delete, Replace costs)",
      "Wildcard Matching",
      "Regular Expression Matching",
      "Longest Increasing Subsequence (LIS) (DP/Binary Search)",
      "Print Longest Increasing Subsequence",
      "Largest Divisible Subset",
      "Longest String Chain",
      "Longest Bitonic Subsequence",
      "Number of Longest Increasing Subsequence",
      "Matrix Chain Multiplication (MCM)",
      "Minimum Cost to Cut a Stick",
      "Burst Balloons",
      "Evaluate Boolean Expression to True",
      "Palindrome Partitioning II",
      "Super Egg Drop",
      "DP on Trees (House Robber III / Diameter max values)",
      "Bitmask DP (Assignment / TSP)",
      "Digit DP (Counting bounds)"
    ],
    problems: [
      { name: "Coin Change", difficulty: "Medium", link: "https://leetcode.com/problems/coin-change/" }
    ],
    weakConcepts: [],
    aiRec: "Locked node. Must resolve active Strings and Graph nodes first."
  }
];

const connections = [
  { from: "arrays", to: "hashing" },
  { from: "arrays", to: "strings" },
  { from: "hashing", to: "binary-search" },
  { from: "strings", to: "sliding-window" },
  { from: "hashing", to: "trees" },
  { from: "strings", to: "trees" },
  { from: "trees", to: "graphs" },
  { from: "graphs", to: "dp" },
  { from: "strings", to: "dp" }
];

// Robust helper to match UI Node IDs (with plurals/hyphens) to curriculum topicIds
const findCurriculumTopic = (nodeId) => {
  if (!nodeId) return null;
  const cleanId = nodeId.toLowerCase().trim();
  return completeRoadmap.find(t => {
    const cleanTopicId = t.topicId.toLowerCase().trim();
    return (
      cleanTopicId === cleanId ||
      cleanTopicId === cleanId.replace(/s$/, "") ||
      cleanTopicId.replace(/s$/, "") === cleanId ||
      cleanTopicId.replace(/-/g, "") === cleanId.replace(/-/g, "")
    );
  });
};

// Interactive checkable subtopic element
function SubtopicItem({ nodeId, sub }) {
  const storageKey = `completed_sub_${nodeId}_${sub}`;
  const [isDone, setIsDone] = useState(() => localStorage.getItem(storageKey) === "true");
  
  const handleToggle = () => {
    const nextState = !isDone;
    localStorage.setItem(storageKey, String(nextState));
    setIsDone(nextState);
  };

  return (
    <div 
      onClick={handleToggle}
      className="flex items-center gap-2.5 text-xs text-zinc-300 py-1.5 px-2 rounded hover:bg-zinc-900/60 cursor-pointer transition-colors select-none"
    >
      <span className={`text-[13px] font-bold leading-none ${isDone ? "text-accent-emerald" : "text-zinc-700"}`}>
        ✓
      </span>
      <span className={`${isDone ? "text-zinc-400 line-through decoration-zinc-700" : "text-zinc-305"}`}>
        {sub}
      </span>
    </div>
  );
}

function Roadmap() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState(initialNodes[2]); // Strings
  const [hoveredNode, setHoveredNode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  
  // Inline active lesson state within curriculum popup
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Accessibility motion preferences check
  const shouldReduceMotion = useReducedMotion();

  // Pan and Zoom
  const [pan, setPan] = useState({ x: 50, y: 30 });
  const [zoom, setZoom] = useState(0.95);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Load progress initially
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await API.get("/progress");
        if (res.data?.completedProblems) {
          const completedIds = res.data.completedProblems;
          setNodes((prevNodes) =>
            prevNodes.map((node) => {
              if (node.problems.length === 0) return node;
              const completedCount = node.problems.filter((p) =>
                completedIds.some((id) => p.link.includes(id) || p.name.includes(id))
              ).length;
              const completion = Math.round((completedCount / node.problems.length) * 100);
              let status = node.status;
              if (completion === 100) status = "completed";
              return { ...node, completion, status };
            })
          );
        }
      } catch (error) {
        console.log("Roadmap progress loader: API unreachable, fallback to visual mock parameters:", error);
      } finally {
        setTimeout(() => setLoading(false), 300); // Smooth skeleton transition
      }
    };
    
    fetchProgress();

    // Listen for automatic progress sync updates from extension
    const handleStorageChange = (e) => {
      if (e.key === "codement_sync_trigger") {
        console.log("CodeMent: Extension progress sync detected. Refreshing roadmap progress...");
        fetchProgress();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isLessonCompleted = (lesson) => {
    return completedLessons.includes(lesson.id) || lesson.completionState;
  };

  // Sync completion states with nodes progress on graph layout
  useEffect(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const fullTopic = findCurriculumTopic(node.id);
        if (!fullTopic) return node;
        const topicLessons = fullTopic.modules.flatMap((m) => m.lessons);
        if (topicLessons.length === 0) return node;
        
        const completedCount = topicLessons.filter((l) => isLessonCompleted(l)).length;
        const completion = Math.round((completedCount / topicLessons.length) * 100);
        
        let status = node.status;
        if (completion === 100) status = "completed";
        else if (completion > 0 && status === "locked") status = "active";
        
        return { ...node, completion, status };
      })
    );
  }, [completedLessons]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    
    // Check if clicking on background canvas to close selected floating panel
    if (e.target === canvasRef.current || e.target.tagName === "svg" || e.target.id === "canvas-container") {
      setSelectedNode(null);
      setActiveLesson(null);
    }
    
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const intensity = 0.05;
    const delta = e.deltaY < 0 ? 1 : -1;
    const newZoom = Math.min(Math.max(zoom + delta * intensity, 0.6), 1.5);
    setZoom(parseFloat(newZoom.toFixed(2)));
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.6));
  const resetPanZoom = () => {
    setPan({ x: 50, y: 30 });
    setZoom(0.95);
  };

  const isConnectionHighlighted = (conn) => {
    if (!hoveredNode) return false;
    return conn.from === hoveredNode || conn.to === hoveredNode;
  };

  const getConnectorStyle = (conn) => {
    const fromNode = nodes.find((n) => n.id === conn.from);
    const toNode = nodes.find((n) => n.id === conn.to);
    const isHighlighted = isConnectionHighlighted(conn);

    if (isHighlighted) {
      return { stroke: "#06b6d4", strokeWidth: 3, glow: "drop-shadow(0 0 8px #06b6d4)", particleColor: "#06b6d4" };
    }
    if (fromNode.status === "completed" && toNode.status === "completed") {
      return { stroke: "#10b981", strokeWidth: 2, glow: "none", particleColor: "#10b981" };
    }
    if (fromNode.status === "completed" && toNode.status === "active") {
      return { stroke: "#06b6d4", strokeWidth: 2, glow: "none", particleColor: "#06b6d4" };
    }
    return { stroke: "#27272a", strokeWidth: 1.5, glow: "none", particleColor: "#6366f1" };
  };

  const getNodeStyles = (status) => {
    switch (status) {
      case "completed":
        return {
          border: "border-accent-emerald/40 hover:border-accent-emerald/80",
          glow: "shadow-[0_0_20px_rgba(16,185,129,0.03)]",
          headerColor: "text-zinc-100",
          glowAnim: "animate-[node-pulse-completed_1.6s_infinite_ease-in-out]"
        };
      case "active":
        return {
          border: "border-accent-cyan/80",
          glow: "shadow-[0_0_25px_rgba(6,182,212,0.12)]",
          headerColor: "text-zinc-50 font-bold",
          glowAnim: "animate-[node-pulse-active_1.6s_infinite_ease-in-out]"
        };
      case "locked":
      default:
        return {
          border: "border-zinc-800 hover:border-zinc-700",
          glow: "shadow-none",
          headerColor: "text-zinc-400 group-hover:text-zinc-200",
          glowAnim: "animate-[node-pulse-locked_1.6s_infinite_ease-in-out]"
        };
    }
  };

  // Reposition floating card dynamically to avoid viewport limits inside canvas
  const getFloatingCardPosition = (node) => {
    if (!node) return { left: 0, top: 0 };
    
    // Left boundary: place left if coordinate is near right edge (x > 700)
    const left = node.x > 700 ? node.x - 365 : node.x + 195;
    
    // Top boundary: clamp alignment offset based on height range
    let top = node.y - 120;
    if (top < 20) top = 20;
    if (top > 320) top = 320;
    
    return { left, top };
  };

  // Helper to find the current active progress state across completeRoadmap
  const getNextStudyState = () => {
    for (const topic of completeRoadmap) {
      for (const module of topic.modules) {
        for (const lesson of module.lessons) {
          if (!isLessonCompleted(lesson)) {
            // Find next 5 lessons in sequence
            const allLessons = completeRoadmap.flatMap(t => t.modules.flatMap(m => m.lessons));
            const currentIdx = allLessons.findIndex(l => l.id === lesson.id);
            const nextFive = allLessons.slice(currentIdx + 1, currentIdx + 6);
            
            // Calculate progress inside current topic
            const topicLessons = topic.modules.flatMap(m => m.lessons);
            const completedInTopic = topicLessons.filter(l => isLessonCompleted(l)).length;
            const topicProgress = topicLessons.length > 0 ? Math.round((completedInTopic / topicLessons.length) * 100) : 0;
            
            // Calculate remaining time for uncompleted lessons in this topic
            const remainingMins = topicLessons
              .filter(l => !isLessonCompleted(l))
              .reduce((sum, l) => {
                const mins = parseInt(l.estimatedDuration || l.duration) || 20;
                return sum + mins;
              }, 0);

            const activeProblem = lesson.linkedPracticeProblems?.[0] || lesson.practiceProblems?.[0] || null;

            return {
              topic,
              module,
              lesson,
              nextFive,
              topicProgress,
              remainingMins,
              activeProblem
            };
          }
        }
      }
    }
    // Default fallback if everything is completed
    if (completeRoadmap.length > 0) {
      const lastTopic = completeRoadmap[completeRoadmap.length - 1];
      const lastMod = lastTopic.modules[lastTopic.modules.length - 1];
      const lastLes = lastMod.lessons[lastMod.lessons.length - 1];
      return {
        topic: lastTopic,
        module: lastMod,
        lesson: lastLes,
        nextFive: [],
        topicProgress: 100,
        remainingMins: 0,
        activeProblem: lastLes.linkedPracticeProblems?.[0] || null
      };
    }
    return null;
  };

  // Helper to determine active companion focus state. Defaults to first uncompleted, or locks to inspected lesson
  const getSidebarCompanionState = () => {
    if (activeLesson) {
      let foundTopic = null;
      let foundModule = null;
      for (const topic of completeRoadmap) {
        for (const module of topic.modules) {
          if (module.lessons.some(l => l.id === activeLesson.id)) {
            foundTopic = topic;
            foundModule = module;
            break;
          }
        }
        if (foundTopic) break;
      }

      if (foundTopic && foundModule) {
        const allLessons = completeRoadmap.flatMap(t => t.modules.flatMap(m => m.lessons));
        const currentIdx = allLessons.findIndex(l => l.id === activeLesson.id);
        const nextFive = allLessons.slice(currentIdx + 1, currentIdx + 6);
        
        const topicLessons = foundTopic.modules.flatMap(m => m.lessons);
        const completedInTopic = topicLessons.filter(l => isLessonCompleted(l)).length;
        const topicProgress = topicLessons.length > 0 ? Math.round((completedInTopic / topicLessons.length) * 100) : 0;
        
        const remainingMins = topicLessons
          .filter(l => !isLessonCompleted(l))
          .reduce((sum, l) => {
            const mins = parseInt(l.estimatedDuration || l.duration) || 20;
            return sum + mins;
          }, 0);

        const activeProblem = activeLesson.linkedPracticeProblems?.[0] || activeLesson.practiceProblems?.[0] || null;

        return {
          topic: foundTopic,
          module: foundModule,
          lesson: activeLesson,
          nextFive,
          topicProgress,
          remainingMins,
          activeProblem
        };
      }
    }
    return getNextStudyState();
  };

  const companionState = getSidebarCompanionState();

  // Calculate Overall DSA progress values
  const allCurriculumLessons = completeRoadmap.flatMap(t => t.modules.flatMap(m => m.lessons));
  const totalCurriculumCount = allCurriculumLessons.length;
  const completedCurriculumCount = allCurriculumLessons.filter(l => isLessonCompleted(l)).length;
  const overallProgressPercent = totalCurriculumCount > 0 ? Math.round((completedCurriculumCount / totalCurriculumCount) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
      className="noise-bg h-screen bg-zinc-955 text-zinc-100 font-sans flex relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Main Canvas Graph Workspace */}
      <div
        ref={canvasRef}
        id="canvas-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={handleWheel}
        className={`flex-1 h-full overflow-hidden relative select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        role="application"
        aria-label="Interactive DSA Skill Graph Canvas. Click node to reveal curriculum popover."
      >
        {/* Canvas Toolbar Controls (Top Left) */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-lg">
          <button
            onClick={zoomIn}
            className="p-1.5 rounded bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-50 transition-all active:scale-95 cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
            aria-label="Zoom In"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={zoomOut}
            className="p-1.5 rounded bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-50 transition-all active:scale-95 cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
            aria-label="Zoom Out"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-[10px] font-mono text-zinc-555 px-2 select-none" aria-live="polite">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={resetPanZoom}
            className="p-1.5 rounded bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 text-[10px] font-mono text-zinc-455 hover:text-zinc-50 transition-all active:scale-95 cursor-pointer focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
          >
            Reset
          </button>
        </div>

        {/* Legend Indicators */}
        <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-4 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald/20 border border-accent-emerald"></span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan/20 border border-accent-cyan animate-pulse"></span>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800"></span>
            <span>Locked</span>
          </div>
        </div>

        <AnimatePresence>
          {loading ? (
            /* Premium Shimmer skeleton loader overlay */
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-zinc-950 z-35 flex flex-col justify-center items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full border-2 border-zinc-800 border-t-accent-cyan animate-spin"></div>
              <span className={`text-xs font-mono text-zinc-500 tracking-widest ${shouldReduceMotion ? "" : "animate-pulse"}`}>
                INITIALIZING CANVAS GRAPH...
              </span>
            </motion.div>
          ) : (
            /* Canvas components */
            <motion.div
              key="canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 origin-top-left"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
              }}
            >
              {/* Connection Paths */}
              <svg className="absolute inset-0 pointer-events-none overflow-visible z-0" style={{ width: 1500, height: 800 }}>
                {connections.map((conn, idx) => {
                  const fromNode = nodes.find((n) => n.id === conn.from);
                  const toNode = nodes.find((n) => n.id === conn.to);
                  const startX = fromNode.x + 180;
                  const startY = fromNode.y + 38;
                  const endX = toNode.x;
                  const endY = toNode.y + 38;

                  const controlOffset = Math.abs(endX - startX) * 0.5;
                  const pathD = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
                  const style = getConnectorStyle(conn);

                  return (
                    <g key={idx}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={style.stroke}
                        strokeWidth={style.strokeWidth}
                        className="transition-all duration-300"
                        style={{ filter: style.glow }}
                      />
                      {fromNode.status !== "locked" && !shouldReduceMotion && (
                        <>
                          <circle r="2.5" fill={style.particleColor} className="filter blur-[0.5px]">
                            <animateMotion dur="2.5s" repeatCount="indefinite" path={pathD} calcMode="linear" />
                          </circle>
                          <circle r="2.5" fill={style.particleColor} className="filter blur-[0.5px]">
                            <animateMotion dur="2.5s" begin="1.25s" repeatCount="indefinite" path={pathD} calcMode="linear" />
                          </circle>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Graph Nodes */}
              {nodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                const nodeStyle = getNodeStyles(node.status);

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2, boxShadow: "0 0 25px rgba(6,182,212,0.15)" }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24, delay: shouldReduceMotion ? 0 : index * 0.03 }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      setSelectedNode(node);
                      setExpandedModuleId(null); // Reset open modules state on click
                      setActiveLesson(null); // Clear active lesson state when changing topic node
                    }}
                    className={`absolute w-[180px] h-[76px] p-3.5 rounded-xl bg-zinc-955 border cursor-pointer group flex flex-col justify-between transition-all duration-300 z-10 focus-visible:ring-2 focus-visible:ring-accent-cyan outline-none ${
                      nodeStyle.border} ${nodeStyle.glow} ${shouldReduceMotion ? "" : nodeStyle.glowAnim} ${
                      isSelected ? "border-accent-cyan ring-2 ring-accent-cyan/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]" : ""
                    }`}
                    style={{ left: node.x, top: node.y }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Inspect ${node.title} node, status is ${node.status}, completion ${node.completion} percent`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedNode(node);
                        setExpandedModuleId(null);
                        setActiveLesson(null);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold tracking-tight transition-colors ${nodeStyle.headerColor}`}>
                        {node.title}
                      </span>
                      {node.status === "completed" && (
                        <svg className="w-3.5 h-3.5 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {node.status === "active" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping"></span>
                      )}
                      {node.status === "locked" && (
                        <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex items-end justify-between mt-2 font-mono text-[9px] text-zinc-555">
                      <div>
                        <span className="text-zinc-650">IMP:</span>{" "}
                        <span className={node.importance === "Critical" ? "text-red-500 font-bold" : "text-amber-500"}>
                          {node.importance}
                        </span>
                      </div>
                      <div className="text-right">
                        {node.status !== "locked" ? (
                          <span className="text-accent-cyan font-bold">{node.completion}%</span>
                        ) : (
                          <span>LOCKED</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Premium Floating Popover Curriculum / Lesson Viewer Panel */}
              <AnimatePresence>
                {selectedNode && (
                  (() => {
                    const fullTopic = findCurriculumTopic(selectedNode.id) || selectedNode;
                    const flatProblems = (fullTopic.modules && fullTopic.modules.length > 0)
                      ? fullTopic.modules.flatMap(m => m.lessons.flatMap(l => l.linkedPracticeProblems || l.practiceProblems || []))
                      : selectedNode.problems || [];
                    const problemsToRender = Array.from(new Map(flatProblems.map(p => [p.title || p.name, p])).values());
                    
                    const pos = getFloatingCardPosition(selectedNode);
                    // spatial origins pointing back to clicked node center coordinates
                    const startX = selectedNode.x - pos.left + 90;
                    const startY = selectedNode.y - pos.top + 38;

                    return (
                      <motion.div
                        key={`floating-${selectedNode.id}`}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3, x: startX, y: startY }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3, x: startX, y: startY }}
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="absolute w-[350px] max-h-[480px] overflow-y-auto rounded-2xl p-5 border border-zinc-800/80 bg-zinc-950/92 backdrop-blur-md shadow-2xl z-20 flex flex-col space-y-4 cursor-default select-text"
                        style={{
                          left: pos.left,
                          top: pos.top
                        }}
                        onClick={(e) => e.stopPropagation()} // Stop bubble up
                      >
                        <AnimatePresence mode="wait">
                          {activeLesson ? (
                            /* State 2: Inline Lesson Detail Viewer */
                            <motion.div
                              key="lesson-view"
                              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
                              className="space-y-4"
                            >
                              {/* Header back button */}
                              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                                <button
                                  onClick={() => setActiveLesson(null)}
                                  className="flex items-center gap-1 text-[11px] font-mono text-accent-cyan hover:underline cursor-pointer outline-none"
                                >
                                  ← Back to Curriculum
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedNode(null);
                                    setActiveLesson(null);
                                  }}
                                  className="p-1 rounded hover:bg-zinc-900 text-zinc-555 hover:text-zinc-300 transition-all cursor-pointer outline-none"
                                  aria-label="Close panel"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>

                              {/* Title block */}
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-850 bg-zinc-900 text-zinc-400">
                                    {activeLesson.estimatedDuration || activeLesson.duration || "20m"}
                                  </span>
                                  <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                                    activeLesson.difficulty === "Easy" ? "border-accent-emerald/20 text-accent-emerald bg-accent-emerald/10" : "border-amber-500/20 text-amber-500 bg-amber-500/10"
                                  }`}>
                                    {activeLesson.difficulty || "Easy"}
                                  </span>
                                </div>
                                <h3 className="text-base font-bold text-zinc-50 mt-2 font-sans tracking-tight leading-snug">
                                  {activeLesson.title}
                                </h3>
                              </div>

                              {/* Objective */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest block font-bold">Objective</span>
                                <p className="text-xs text-zinc-300 font-sans italic leading-relaxed bg-zinc-900/20 p-2.5 rounded border border-zinc-900">
                                  "{activeLesson.learningObjective || activeLesson.objective}"
                                </p>
                              </div>

                              {/* Explanation theory placeholder */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">Explanation</span>
                                <p className="text-xs leading-relaxed text-zinc-455 font-sans">
                                  {activeLesson.conciseExplanationPlaceholder || "Conceptual overview is being prepared for this section."}
                                </p>
                              </div>

                              {/* Implementation Tips */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">Implementation Tips</span>
                                <ul className="space-y-1 text-xs text-zinc-400 pl-4 list-disc font-sans leading-relaxed">
                                  {(activeLesson.implementationTipsPlaceholder || activeLesson.implementationTips || [
                                    "Choose clean boundary variable markers.",
                                    "Validate base constraints limits."
                                  ]).map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                  ))}
                                </ul>
                              </div>

                              {/* Common Mistakes */}
                              <div className="space-y-1.5 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                                <span className="text-[9px] font-mono text-red-400 uppercase tracking-wider block font-bold">Common Mistakes</span>
                                <ul className="space-y-1 text-xs text-zinc-400 pl-4 list-disc font-sans leading-relaxed">
                                  {(activeLesson.commonMistakesPlaceholder || activeLesson.commonMistakes || [
                                    "Forgetting edge index offset checks.",
                                    "Infinite recurrence call loops."
                                  ]).map((mistake, idx) => (
                                    <li key={idx} className="marker:text-red-500">{mistake}</li>
                                  ))}
                                </ul>
                              </div>

                              {/* Practice Problems */}
                              {(activeLesson.linkedPracticeProblems || activeLesson.practiceProblems)?.length > 0 && (
                                <div className="space-y-2 pt-1 border-t border-zinc-900/40">
                                  <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">Linked Practice Problems</span>
                                  <div className="flex flex-col gap-1.5">
                                    {(activeLesson.linkedPracticeProblems || activeLesson.practiceProblems).map((prob, idx) => (
                                      <a
                                        key={idx}
                                        href={prob.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-zinc-750 hover:bg-zinc-900/40 transition-all text-xs group focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
                                      >
                                        <span className="text-zinc-400 group-hover:text-zinc-100 transition-colors truncate max-w-[200px]">
                                          {prob.title || prob.name}
                                        </span>
                                        <span className="text-[9px] font-mono text-zinc-650 group-hover:text-accent-cyan transition-colors">
                                          Solve ↗
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Completion Action */}
                              <div className="pt-2">
                                <button
                                  onClick={() => {
                                    const isCompleted = isLessonCompleted(activeLesson);
                                    if (isCompleted) {
                                      setCompletedLessons(prev => prev.filter(id => id !== activeLesson.id));
                                    } else {
                                      setCompletedLessons(prev => [...prev, activeLesson.id]);
                                    }
                                  }}
                                  className={`w-full py-2.5 rounded-lg font-sans font-bold text-xs transition-all active:scale-[0.98] cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan ${
                                    isLessonCompleted(activeLesson)
                                      ? "bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald hover:bg-accent-emerald/15"
                                      : "bg-zinc-55 text-zinc-955 hover:bg-zinc-200"
                                  }`}
                                >
                                  {isLessonCompleted(activeLesson) ? "Completed ✓" : "Mark Complete"}
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            /* State 1: Curriculum Overview index view */
                            <motion.div
                              key="curriculum-index"
                              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
                              className="space-y-4"
                            >
                              {/* Header details */}
                              <div className="flex justify-between items-start border-b border-zinc-900 pb-3">
                                <div>
                                  <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                                    selectedNode.status === "completed"
                                      ? "bg-accent-emerald/10 text-accent-emerald border-accent-emerald/20"
                                      : selectedNode.status === "active"
                                      ? "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20"
                                      : "bg-zinc-900 text-zinc-550 border-zinc-850"
                                  }`}>
                                    {selectedNode.status} Node
                                  </span>
                                  <h3 className="text-lg font-bold text-zinc-50 mt-1.5 font-sans tracking-tight">
                                    {selectedNode.title}
                                  </h3>
                                </div>
                                
                                <button
                                  onClick={() => setSelectedNode(null)}
                                  className="p-1 rounded hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer outline-none"
                                  aria-label="Close details"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>

                              {/* Metadata grid */}
                              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-zinc-400 bg-zinc-900/10 p-2.5 rounded-lg border border-zinc-900/60">
                                <div>
                                  <span className="text-zinc-650 block">EST. TIME</span>
                                  <span className="text-zinc-200 font-semibold mt-0.5 block">{fullTopic.estimatedTime || "--"}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-655 block">DIFFICULTY</span>
                                  <span className="text-zinc-200 font-semibold mt-0.5 block">{fullTopic.difficulty}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-660 block">PREREQS</span>
                                  <span className="text-zinc-200 font-semibold mt-0.5 block">
                                    {fullTopic.prerequisites && fullTopic.prerequisites.length > 0 
                                      ? fullTopic.prerequisites.join(", ") 
                                      : "None"}
                                  </span>
                                </div>
                                <div className="col-span-2 pt-2 border-t border-zinc-900/40">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-zinc-600">COMPLETION PROGRESS</span>
                                    <span className="text-accent-cyan font-bold">{selectedNode.completion}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mt-1 relative">
                                    <motion.div
                                      className="h-full bg-accent-cyan rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${selectedNode.completion}%` }}
                                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Objectives */}
                              {fullTopic.learningObjectives && fullTopic.learningObjectives.length > 0 && (
                                <div className="space-y-1">
                                  <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">Objectives</span>
                                  <ul className="space-y-0.5 text-[11px] text-zinc-400 pl-4 list-disc font-sans leading-relaxed">
                                    {fullTopic.learningObjectives.map((obj, oIdx) => (
                                      <li key={oIdx}>{obj}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Description overview */}
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">Overview</span>
                                <p className="text-xs leading-relaxed text-zinc-400 font-sans">
                                  {fullTopic.description || selectedNode.overview}
                                </p>
                              </div>

                              {/* Subtopics Section */}
                              <div className="space-y-2">
                                <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">Subtopics</span>
                                <div className="space-y-1 bg-zinc-900/20 p-3 rounded-xl border border-zinc-900/60 max-h-[220px] overflow-y-auto">
                                  {selectedNode.concepts && selectedNode.concepts.map((sub, sIdx) => (
                                    <SubtopicItem 
                                      key={sIdx} 
                                      nodeId={selectedNode.id} 
                                      sub={sub} 
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Practice Problems */}
                              {problemsToRender.length > 0 && (
                                <div className="space-y-2 pt-1 border-t border-zinc-900/40">
                                  <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">Practice Problems</span>
                                  <div className="flex flex-col gap-1.5">
                                    {problemsToRender.map((prob, idx) => (
                                      <a
                                        key={idx}
                                        href={prob.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-zinc-750 hover:bg-zinc-900/40 transition-all text-xs group focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
                                      >
                                        <span className="text-zinc-400 group-hover:text-zinc-100 transition-colors truncate max-w-[200px]">
                                          {prob.title || prob.name}
                                        </span>
                                        <span className="text-[9px] font-mono text-zinc-600 group-hover:text-accent-cyan transition-colors">
                                          Solve ↗
                                        </span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })()
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Study Companion Sidebar Panel (w-80) */}
      <aside className="w-80 border-l border-zinc-800/80 bg-zinc-955/40 backdrop-blur-md p-6 flex flex-col justify-between overflow-y-auto z-10 flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Study Companion</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
          </div>

          {/* Overall curriculum progress meter */}
          <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-2 select-none">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>OVERALL PROGRESS</span>
              <span className="text-accent-cyan font-bold">{overallProgressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-accent-cyan rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgressPercent}%` }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
            <div className="text-[9px] font-mono text-zinc-600 flex justify-between">
              <span>COMPLETED: {completedCurriculumCount}</span>
              <span>TOTAL LESSONS: {totalCurriculumCount}</span>
            </div>
          </div>

          {companionState ? (
            <div className="space-y-6">
              {/* Focus session detail card */}
              <div className="space-y-3.5">
                <span className="text-[9px] font-mono text-accent-cyan uppercase tracking-widest block font-bold">Current Focus Session</span>
                
                <div className="p-4 rounded-xl border border-zinc-850 bg-zinc-900/20 space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                      <span>CURRENT TOPIC</span>
                      <span className="text-zinc-450 font-semibold">{companionState.topic.difficulty}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-100 mt-1 font-sans">{companionState.topic.title}</h4>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono text-zinc-600 uppercase">CURRENT MODULE</div>
                    <p className="text-xs text-zinc-350 mt-0.5 truncate">{companionState.module.title}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-950/40 border border-zinc-900">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>CURRENT LESSON</span>
                      <span>{companionState.lesson.estimatedDuration || companionState.lesson.duration || "20m"}</span>
                    </div>
                    <p className="text-xs font-semibold text-accent-cyan mt-1 leading-relaxed">{companionState.lesson.title}</p>
                  </div>

                  {companionState.activeProblem && (
                    <div className="p-2.5 rounded bg-zinc-900/50 border border-zinc-900/60 flex items-center justify-between text-xs font-mono text-zinc-500">
                      <span className="text-[9px] uppercase">ACTIVE PROBLEM</span>
                      <a
                        href={companionState.activeProblem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 hover:text-accent-cyan font-bold truncate max-w-[120px] transition-colors"
                      >
                        {companionState.activeProblem.title} ↗
                      </a>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-zinc-500 flex justify-between pt-2 border-t border-zinc-900/60">
                    <span>EST. TIME REMAINING:</span>
                    <span className="text-zinc-300 font-semibold">{companionState.remainingMins} Mins</span>
                  </div>
                </div>

                <Link
                  to={companionState.activeProblem ? `/roadmap/${companionState.topic.id}` : `/roadmap/${companionState.topic.id}`}
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-zinc-50 text-zinc-955 font-sans font-bold text-xs hover:bg-zinc-200 transition-all active:scale-95 shadow-md focus-visible:ring-1 focus-visible:ring-accent-cyan outline-none"
                >
                  Quick Resume ➔
                </Link>
              </div>

              {/* Upcoming path lessons list */}
              {companionState.nextFive.length > 0 && (
                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-zinc-555 uppercase tracking-widest block font-bold">UPCOMING PATH (NEXT 5)</span>
                  <div className="space-y-2">
                    {companionState.nextFive.map((les, idx) => (
                      <div key={les.id} className="p-3 rounded-lg border border-zinc-900/60 bg-zinc-900/10 flex justify-between items-center text-xs font-sans">
                        <div className="space-y-0.5 truncate pr-3">
                          <div className="font-semibold text-zinc-400 truncate max-w-[170px]">{les.title}</div>
                          <div className="font-mono text-[8px] text-zinc-650">{les.estimatedDuration || les.duration} • {les.difficulty}</div>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-655">+{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-600 text-xs font-sans">
              No active uncompleted lessons found. You have fully unlocked all curriculum components!
            </div>
          )}
        </div>

        <div className="text-[9px] font-mono text-zinc-605 flex justify-between pt-4 border-t border-zinc-900/60 select-none">
          <span>COMPANION ACTIVE</span>
          <span>v1.3</span>
        </div>
      </aside>
    </motion.div>
  );
}

export default Roadmap;
