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
    url: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);

