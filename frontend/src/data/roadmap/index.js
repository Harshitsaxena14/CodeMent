import basics from "./topics/basics";
import arrays from "./topics/arrays";
import strings from "./topics/strings";
import linkedlist from "./topics/linkedlist";
import stack from "./topics/stack";
import queue from "./topics/queue";
import tree from "./topics/tree";
import graph from "./topics/graph";
import hashing from "./topics/hashing";
import binarysearch from "./topics/binarysearch";
import recursion from "./topics/recursion";
import backtracking from "./topics/backtracking";
import slidingwindow from "./topics/slidingwindow";
import twopointer from "./topics/twopointer";
import prefixsum from "./topics/prefixsum";
import greedy from "./topics/greedy";
import bitmanipulation from "./topics/bitmanipulation";
import bst from "./topics/bst";
import heap from "./topics/heap";
import trie from "./topics/trie";
import dp from "./topics/dp";
import segmenttree from "./topics/segmenttree";
import fenwicktree from "./topics/fenwicktree";
import unionfind from "./topics/unionfind";
import numbertheory from "./topics/numbertheory";
import math from "./topics/math";
import complexity from "./topics/complexity";

// Assemble complete curriculum dataset
export const completeRoadmap = [
  basics,
  arrays,
  strings,
  hashing,
  linkedlist,
  stack,
  queue,
  binarysearch,
  recursion,
  backtracking,
  slidingwindow,
  twopointer,
  prefixsum,
  greedy,
  bitmanipulation,
  tree,
  bst,
  heap,
  trie,
  graph,
  dp,
  segmenttree,
  fenwicktree,
  unionfind,
  numbertheory,
  math,
  complexity
];

// Adapt structure for 100% legacy compatibility with existing UI
export const roadmap = completeRoadmap.map((t) => ({
  ...t,
  concepts: t.concepts || t.modules.flatMap(m => m.lessons.map(l => l.title)),
  questions: t.questions || t.modules.flatMap(m => m.lessons.flatMap(l => l.linkedPracticeProblems || l.practiceProblems || [])).map((p, idx) => ({
    id: p.id || idx + 1,
    title: p.title,
    difficulty: p.difficulty,
    pattern: p.pattern,
    link: p.link
  }))
}));

export default roadmap;
