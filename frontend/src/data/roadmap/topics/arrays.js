const arrays = {
  id: 2,
  topicId: "arrays",
  title: "Arrays",
  description: "Contiguous memory spaces housing structured records. Study linear scans, indexing, pointer bounds, and window offsets.",
  estimatedTime: "6 Hours",
  difficulty: "Easy",
  prerequisites: ["basics"],
  learningObjectives: [
    "Manage two-pointer sliding boundaries",
    "Apply prefix accumulation sum slices",
    "Identify optimal Kadane contiguous bounds choices"
  ],
  concepts: ["Traversal", "Two Pointer", "Sliding Window", "Prefix Sum", "Kadane Algorithm"], // For fallback UI compatibility
  modules: [
    {
      id: "mod-arrays-two-pointer",
      title: "Two-Pointer Strategy",
      order: 1,
      shortDescription: "Converge two boundary markers to resolve lookup constraints in linear time.",
      estimatedTime: "120 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-arrays-pointer-convergence",
          title: "Pointer Convergence Basics",
          learningObjective: "Understand how to scan sorted array elements from outer bounds towards the center in O(N) runtime.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Two-pointer convergence is a technique used primarily on sorted arrays to search for pairs or segments satisfying a specific condition in linear time. By placing one pointer at the start (left) and another at the end (right) of the array, we can systematically narrow the search space. Instead of checking all O(N^2) possible pairs using nested loops, we compare the sum of the elements at the two pointers against a target value. If the current sum is too small, we increment the left pointer to increase the sum. If the sum is too large, we decrement the right pointer to reduce the sum. This greedy elimination works because the array is sorted, ensuring that moving a pointer guarantees a predictable change in sum value. The process continues until the pointers meet. This reduces the search runtime to O(N) since each step processes at least one element out of consideration, making it a critical tool for search optimization.\n\nTime Complexity: O(N) where N is array length.\nSpace Complexity: O(1) auxiliary pointer memory.",
          implementationTipsPlaceholder: [
            "Initialize left pointer at 0 and right pointer at length - 1.",
            "Use a while loop containing condition 'left < right'.",
            "Ensure the input array is sorted before applying convergence."
          ],
          commonMistakesPlaceholder: [
            "Infinite loops caused by omitting pointer increment/decrement operations.",
            "Off-by-one errors when array boundary indexes exceed array limits.",
            "Applying this method to unsorted arrays, which invalidates the pointer shift logic."
          ],
          linkedPracticeProblems: [
            {
              id: 1,
              title: "Two Sum II - Input Array Is Sorted",
              difficulty: "Easy",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
            },
            {
              id: 2,
              title: "Valid Palindrome",
              difficulty: "Easy",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/valid-palindrome/"
            },
            {
              id: 3,
              title: "Container With Most Water",
              difficulty: "Medium",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/container-with-most-water/"
            },
            {
              id: 4,
              title: "3Sum",
              difficulty: "Medium",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/3sum/"
            },
            {
              id: 5,
              title: "Trapping Rain Water",
              difficulty: "Hard",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/trapping-rain-water/"
            }
          ],
          completionState: false
        },
        {
          id: "lesson-arrays-partitioning",
          title: "Two-Pointer Partitioning",
          learningObjective: "Rearrange array elements in-place based on pivot value conditions.",
          estimatedDuration: "25 Mins",
          difficulty: "Medium",
          prerequisiteLessons: ["lesson-arrays-pointer-convergence"],
          conciseExplanationPlaceholder: "Two-pointer partitioning involves using two pointers moving in the same direction or from opposite bounds to rearrange array elements in-place based on a pivot or element type. Common examples include placing all non-zero elements at the front, separating even and odd numbers, or sorting values in a single pass (like the Dutch National Flag algorithm). Here, one pointer (usually called 'write' or 'slow') tracks the boundary of the correctly positioned partition, while the other pointer ('read' or 'fast') scans the array to identify elements that belong in that partition. When a target element is found, it is swapped with the element at the 'write' pointer, and the write pointer is incremented. This technique modifies the array in-place without allocating auxiliary lists, which is highly valued in systems programming where memory overhead must be minimized. It is a cornerstone for quicksort partitioning schemes.\n\nTime Complexity: O(N) single-pass iteration.\nSpace Complexity: O(1) in-place swaps.",
          implementationTipsPlaceholder: [
            "Use one pointer to iterate (fast pointer) and another to track destination swaps (slow pointer).",
            "For three-way partitioning, use three pointers (low, mid, high) to swap elements dynamically."
          ],
          commonMistakesPlaceholder: [
            "Forgetting to advance the scan pointer after performing a swap, causing infinite loops.",
            "Incorrectly swapping elements that are already in their valid positions."
          ],
          linkedPracticeProblems: [
            {
              id: 6,
              title: "Move Zeroes",
              difficulty: "Easy",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/move-zeroes/"
            },
            {
              id: 7,
              title: "Remove Duplicates from Sorted Array",
              difficulty: "Easy",
              pattern: "Two Pointer",
              link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
            },
            {
              id: 8,
              title: "Sort Colors",
              difficulty: "Medium",
              pattern: "Three Pointer",
              link: "https://leetcode.com/problems/sort-colors/"
            }
          ],
          completionState: false
        }
      ]
    },
    {
      id: "mod-arrays-sliding-window",
      title: "Sliding Window",
      order: 2,
      shortDescription: "Track contiguous segment ranges to solve subarray search problems.",
      estimatedTime: "120 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-arrays-sliding-fixed",
          title: "Fixed Sliding Window",
          learningObjective: "Perform calculations on contiguous segments of size K in linear O(N) runtime.",
          estimatedDuration: "30 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "A fixed-size sliding window is a performance optimization pattern used to calculate statistics (like max sum, average, or distinct counts) over contiguous subarrays of a constant size K. In a naive approach, calculating sums for all subarrays of size K requires recalculating sums from scratch, leading to an O(N * K) runtime. The sliding window technique optimizes this to O(N) by sharing calculations between overlapping subarrays. As the window shifts one element to the right, the new subarray sum is obtained by adding the incoming element entering the window from the right and subtracting the outgoing element leaving the window from the left. This keeps the window size exactly K. The key is recognizing that adjacent windows of size K share K-1 elements, meaning we only perform two operations (one addition, one subtraction) per step. This pattern is widely applied in streaming data, moving averages, and signal processing filters.\n\nTime Complexity: O(N) linear time.\nSpace Complexity: O(1) auxiliary sum variable.",
          implementationTipsPlaceholder: [
            "Initialize the first window sum by iterating from index 0 to K-1.",
            "Slide the window using a loop from index K to N-1, adding elements[i] and subtracting elements[i-K]."
          ],
          commonMistakesPlaceholder: [
            "Calculating the window sum inside the loop from scratch, defeating the O(N) optimization.",
            "Off-by-one errors when subtracting the outgoing element (subtracting index i-K-1 instead of i-K)."
          ],
          linkedPracticeProblems: [
            {
              id: 9,
              title: "Maximum Average Subarray I",
              difficulty: "Easy",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/maximum-average-subarray-i/"
            },
            {
              id: 10,
              title: "Defuse the Bomb",
              difficulty: "Easy",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/defuse-the-bomb/"
            },
            {
              id: 11,
              title: "Maximum Points You Can Obtain from Cards",
              difficulty: "Medium",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/"
            },
            {
              id: 12,
              title: "Sliding Window Maximum",
              difficulty: "Hard",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/sliding-window-maximum/"
            }
          ],
          completionState: false
        },
        {
          id: "lesson-arrays-sliding-variable",
          title: "Variable-Size Sliding Window",
          learningObjective: "Expand and contract window bounds dynamically to identify optimal subarray ranges.",
          estimatedDuration: "35 Mins",
          difficulty: "Medium",
          prerequisiteLessons: ["lesson-arrays-sliding-fixed"],
          conciseExplanationPlaceholder: "A variable-size sliding window adapts its left and right boundaries dynamically to find the shortest or longest contiguous subarray matching a specific condition. Unlike fixed windows, we expand the window by incrementing the right pointer to include elements until the condition is met (or violated). If the window state becomes invalid (e.g. sum exceeds limit or too many unique characters), we contract the window by incrementing the left pointer until the state returns to validity. Throughout this process, we track the minimum or maximum window length. The dynamic movement of pointers resembles an accordion stretching and shrinking. Since each pointer left and right starts at index 0 and moves to the end of the array exactly once, the amortized runtime remains O(N). This pattern is invaluable for handling substring and subarray constraints containing dynamically calculated constraints.\n\nTime Complexity: O(N) amortized linear scan.\nSpace Complexity: O(K) where K is unique character storage bounds.",
          implementationTipsPlaceholder: [
            "Use a right pointer inside a for loop to expand, and a left pointer inside a nested while loop to contract.",
            "Update the result variable (min/max length) only when the window state is valid."
          ],
          commonMistakesPlaceholder: [
            "Forgetting to update the window state indicators (e.g. sum or frequency map) when shifting the left pointer.",
            "Using an if condition instead of a while loop to contract, leading to invalid states remaining inside the window."
          ],
          linkedPracticeProblems: [
            {
              id: 13,
              title: "Minimum Size Subarray Sum",
              difficulty: "Medium",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/minimum-size-subarray-sum/"
            },
            {
              id: 14,
              title: "Longest Substring Without Repeating Characters",
              difficulty: "Medium",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
            },
            {
              id: 15,
              title: "Fruit Into Baskets",
              difficulty: "Medium",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/fruit-into-baskets/"
            },
            {
              id: 16,
              title: "Minimum Window Substring",
              difficulty: "Hard",
              pattern: "Sliding Window",
              link: "https://leetcode.com/problems/minimum-window-substring/"
            }
          ],
          completionState: false
        }
      ]
    },
    {
      id: "mod-arrays-prefix-sum",
      title: "Prefix Sum & Queries",
      order: 3,
      shortDescription: "Precompute ranges to answer contiguous sub-segment queries in constant time.",
      estimatedTime: "60 Mins",
      difficulty: "Easy",
      lessons: [
        {
          id: "lesson-arrays-prefix-1d",
          title: "1D Prefix Sum Arrays",
          learningObjective: "Precompute prefix sum arrays to answer range sum queries L to R in O(1) runtime.",
          estimatedDuration: "25 Mins",
          difficulty: "Easy",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "The prefix sum technique is a precomputation method used to answer range sum queries on an array in constant O(1) time. We construct an auxiliary prefix array where prefix[i] stores the sum of all elements from index 0 to i-1. With this prefix array precomputed in O(N) time, any range query sum between indices L and R inclusive can be calculated instantly by evaluating prefix[R+1] - prefix[L]. This eliminates the need to run a linear loop over elements from L to R, which would cost O(R-L) time per query. If the application receives Q range queries, precomputation reduces the overall complexity from O(Q * N) to O(N + Q). This prefix mapping represents a trade-off where O(N) extra space is allocated to achieve optimal query efficiency, which is highly beneficial for static datasets with frequent lookups.\n\nTime Complexity: O(N) precomputation, O(1) query lookup.\nSpace Complexity: O(N) prefix array storage.",
          implementationTipsPlaceholder: [
            "Allocate a prefix array of size N + 1 with prefix[0] = 0 to handle range L = 0 seamlessly.",
            "Iterate i from 0 to N-1 and set prefix[i+1] = prefix[i] + nums[i]."
          ],
          commonMistakesPlaceholder: [
            "Allocating a prefix array of size N and forgetting to write conditional logic for the L = 0 boundary case.",
            "Off-by-one boundary mapping mistakes when subtracting coordinates L and R offsets."
          ],
          linkedPracticeProblems: [
            {
              id: 17,
              title: "Range Sum Query - Immutable",
              difficulty: "Easy",
              pattern: "Prefix Sum",
              link: "https://leetcode.com/problems/range-sum-query-immutable/"
            },
            {
              id: 18,
              title: "Find Pivot Index",
              difficulty: "Easy",
              pattern: "Prefix Sum",
              link: "https://leetcode.com/problems/find-pivot-index/"
            },
            {
              id: 19,
              title: "Subarray Sum Equals K",
              difficulty: "Medium",
              pattern: "Prefix Sum / HashMap",
              link: "https://leetcode.com/problems/subarray-sum-equals-k/"
            },
            {
              id: 20,
              title: "Contiguous Array",
              difficulty: "Medium",
              pattern: "Prefix Sum / HashMap",
              link: "https://leetcode.com/problems/contiguous-array/"
            }
          ],
          completionState: false
        }
      ]
    },
    {
      id: "mod-arrays-kadane",
      title: "Kadane Subarray Sum",
      order: 4,
      shortDescription: "Calculate contiguous subarray maximums in single-pass O(N) constraints.",
      estimatedTime: "60 Mins",
      difficulty: "Medium",
      lessons: [
        {
          id: "lesson-arrays-kadane-opt",
          title: "Kadane Subarray Maximums",
          learningObjective: "Track optimal subarray choice transitions iteratively in linear time.",
          estimatedDuration: "30 Mins",
          difficulty: "Medium",
          prerequisiteLessons: [],
          conciseExplanationPlaceholder: "Kadane's algorithm is an elegant dynamic programming technique used to find the maximum sum of a contiguous subarray in a one-dimensional array. A naive brute-force search checks all possible subarray boundaries, costing O(N^2) time. Kadane's algorithm optimizes this to O(N) runtime using a single scan. At each index i, we make a local decision: either extend the current contiguous subarray by adding nums[i], or discard the previous subarray and start a new one beginning exactly at nums[i]. This choice is expressed as current_max = max(nums[i], current_max + nums[i]). We then update a global maximum to record the largest subarray sum encountered. This works because if the sum of the previous subarray drops below zero, it will only decrease the sum of any subsequent subarray, so we discard it. It is a fundamental tool for real-time optimal subsequence search.\n\nTime Complexity: O(N) single-pass iteration.\nSpace Complexity: O(1) memory pointers.",
          implementationTipsPlaceholder: [
            "Initialize currentMax and globalMax with the first element value nums[0].",
            "Maintain variables currentMax and globalMax to save memory and avoid allocating arrays."
          ],
          commonMistakesPlaceholder: [
            "Initializing variables to 0, which fails if the input array contains only negative integers.",
            "Including non-contiguous elements when calculating currentMax values."
          ],
          linkedPracticeProblems: [
            {
              id: 21,
              title: "Maximum Subarray",
              difficulty: "Medium",
              pattern: "Kadane Algorithm",
              link: "https://leetcode.com/problems/maximum-subarray/"
            },
            {
              id: 22,
              title: "Maximum Product Subarray",
              difficulty: "Medium",
              pattern: "Dynamic Programming",
              link: "https://leetcode.com/problems/maximum-product-subarray/"
            },
            {
              id: 23,
              title: "Maximum Sum Circular Subarray",
              difficulty: "Medium",
              pattern: "Kadane Algorithm",
              link: "https://leetcode.com/problems/maximum-sum-circular-subarray/"
            }
          ],
          completionState: false
        }
      ]
    }
  ]
};

export default arrays;
