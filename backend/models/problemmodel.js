const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    difficulty: { type: String },
    topics: { type: [String], default: [] },
    patterns: { type: [String], default: [] },
    topicId: { type: String },
    leetcodeId: { type: Number },
    url: { type: String },
    
    // Extended fields for Phase 1 and future extensions
    topic: { type: String },
    pattern: { type: String },
    subPattern: { type: String },
    roadmapSection: { type: String },
    roadmapOrder: { type: Number },
    estimatedTime: { type: String },
    prerequisites: { type: [String], default: [] },
    companies: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    complexity: {
      time: { type: String },
      space: { type: String }
    },
    hints: { type: [String], default: [] },
    commonMistakes: { type: [String], default: [] },
    revisionNotes: { type: [String], default: [] },
    similarProblems: { type: [String], default: [] },
    logic: { type: String },
    edgeCases: { type: [String], default: [] },
    mistakes: { type: [String], default: [] },
    source: { type: String, default: "official" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);
