const unionfind = {
  id: 24,
  topicId: "union-find",
  title: "Union Find (Disjoint Set)",
  description: "Disjoint-set union tracking connections. Study path compression, union by rank, and cycle validations inside grids.",
  estimatedTime: "5 Hours",
  difficulty: "Medium",
  prerequisites: ["graph"],
  learningObjectives: ["Implement path compression modifications", "Perform union-by-rank checks"],
  modules: [
    {
      id: "mod-unionfind-ops",
      title: "Disjoint Set operations",
      order: 1,
      shortDescription: "Check component connections dynamically.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-unionfind-compression",
          title: "Path Compression search",
          learningObjective: "Optimize find operations to near-constant amortized O(alpha(N)) runtimes.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Points child nodes directly to root leaders during find cycles recursion updates.",
          implementationTipsPlaceholder: ["Use return parent[i] = find(parent[i])"],
          commonMistakesPlaceholder: ["Forgetting component rank height checks during union steps"],
          linkedPracticeProblems: [
            { id: "uf1", title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", pattern: "Union Find", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default unionfind;
