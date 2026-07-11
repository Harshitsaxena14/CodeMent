const Problem = require("../models/problemmodel");

const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Missing slug" });
    }

    const problem = await Problem.findOne({ slug });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.json(problem);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = { getProblemBySlug };

