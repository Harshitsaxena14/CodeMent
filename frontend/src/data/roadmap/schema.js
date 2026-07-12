/**
 * CodeMent Roadmap Curriculum Data Architecture Schema
 * Represents the educational curriculum hierarchy:
 * Major Topic -> Learning Modules -> Lessons -> Practice Problems
 */

/**
 * @typedef {Object} PracticeProblem
 * @property {number|string} id - Unique identifier matching problem directories
 * @property {string} title - Curated problem name
 * @property {string} difficulty - Easy, Medium, Hard
 * @property {string} pattern - Algorithmic subclass pattern (e.g., "HashMap Complement")
 * @property {string} link - URL to practice platform (LeetCode/GFG)
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id - Unique lesson identifier
 * @property {string} title - Lesson name (e.g., "Sliding Window Introduction")
 * @property {string} learningObjective - Core outcome target for the student
 * @property {string} estimatedDuration - Time budget (e.g., "25 Mins")
 * @property {string} difficulty - Easy, Medium, Hard
 * @property {string[]} prerequisiteLessons - Prerequisite lesson IDs
 * @property {string} conciseExplanationPlaceholder - Lesson theory content
 * @property {string[]} implementationTipsPlaceholder - Practical tips for code writing
 * @property {string[]} commonMistakesPlaceholder - Algorithmic pitfalls to watch for
 * @property {PracticeProblem[]} linkedPracticeProblems - Associated coding assignments
 * @property {boolean} completionState - completion tracking state
 */

/**
 * @typedef {Object} LearningModule
 * @property {string} id - Unique module identifier
 * @property {string} title - Module name (e.g., "Basic Array Iterations")
 * @property {number} order - Visual curriculum position sequence number
 * @property {string} shortDescription - Summary description of the module
 * @property {string} estimatedTime - Duration budget (e.g., "60 Mins")
 * @property {string} difficulty - Easy, Medium, Hard
 * @property {Lesson[]} lessons - Ordered list of lessons inside the module
 */

/**
 * @typedef {Object} RoadmapTopic
 * @property {number} id - Legacy numerical identifier for page parameters
 * @property {string} topicId - Machine-readable alphanumeric ID (e.g., "arrays")
 * @property {string} title - Primary topic title (e.g., "Arrays")
 * @property {string} description - Brief summary overview
 * @property {string} estimatedTime - Time commitment budget
 * @property {string} difficulty - Easy, Medium, Hard
 * @property {string[]} prerequisites - Prerequisite topic IDs
 * @property {string[]} learningObjectives - Target outcomes
 * @property {LearningModule[]} modules - Chronological lesson list
 */
