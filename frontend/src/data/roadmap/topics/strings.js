const strings = {
  id: 3,
  topicId: "strings",
  title: "Strings",
  description: "Learn sequence manipulation, character frequency counting, substrings traversals, and string matching algorithms.",
  estimatedTime: "5 Hours",
  difficulty: "Easy",
  prerequisites: ["arrays"],
  learningObjectives: [
    "Manipulate strings in-place or dynamically using array indices",
    "Apply hash mapping for character frequencies anagram checks",
    "Identify substring patterns using sliding window strategies"
  ],
  concepts: ["Anagrams", "Substrings", "Pattern Matching"],
  modules: [
    {
      id: "mod-strings-basics",
      title: "Basic String Queries",
      order: 1,
      shortDescription: "Master basic traversals, palindrome checks, and frequency indexing.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-strings-anagram",
          title: "Anagram Recognition",
          learningObjective: "Validate whether two strings are anagrams in linear time O(N) using frequency counts.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "An anagram is a word formed by rearranging the letters of another. To validate this in O(N) time, use a frequency array or hash map. Increment counts for letters in string A, and decrement them for letters in string B. If all counts are zero at the end, the strings are anagrams.",
          implementationTipsPlaceholder: [
            "Use a fixed array of size 26 for lower-case English alphabets to target O(1) auxiliary space",
            "Validate length equality before starting counts to exit early"
          ],
          commonMistakesPlaceholder: [
            "Assuming case-insensitive matching without modifying input casing",
            "Iterating past boundary lengths on uneven string inputs"
          ],
          linkedPracticeProblems: [
            {
              id: 301,
              title: "Valid Anagram",
              difficulty: "Easy",
              pattern: "Frequency Map",
              link: "https://leetcode.com/problems/valid-anagram/"
            },
            {
              id: 302,
              title: "Group Anagrams",
              difficulty: "Medium",
              pattern: "Hashing Keys",
              link: "https://leetcode.com/problems/group-anagrams/"
            }
          ],
          completionState: false
        }
      ]
    },
    {
      id: "mod-strings-substrings",
      title: "Substring Operations",
      order: 2,
      shortDescription: "Find substrings, search patterns, and evaluate palindromic spans.",
      estimatedTime: "180 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-strings-longest-palindrome",
          title: "Palindromic Substrings",
          learningObjective: "Find the longest palindromic substring using center expansion in O(N^2) time.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: ["lesson-strings-anagram"],
          conciseExplanationPlaceholder: "A palindrome reads the same forwards and backwards. To find the longest substring palindrome, iterate through each character as a potential center and expand outward checking index equalities. Test both odd-length (single center) and even-length (double center) spans. This O(N^2) center expansion avoids the overhead of recursion.",
          implementationTipsPlaceholder: [
            "Manage indices carefully to prevent index out of bounds exceptions on outer boundaries",
            "Store length boundaries instead of copying strings repeatedly to minimize space"
          ],
          commonMistakesPlaceholder: [
            "Checking only odd-length centers, missing even-length palindromes like 'abba'.",
            "Failing to handle empty or single-character string bounds."
          ],
          linkedPracticeProblems: [
            {
              id: 303,
              title: "Longest Palindromic Substring",
              difficulty: "Medium",
              pattern: "Center Expansion",
              link: "https://leetcode.com/problems/longest-palindromic-substring/"
            },
            {
              id: 304,
              title: "Minimum Window Substring",
              difficulty: "Hard",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/minimum-window-substring/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default strings;
