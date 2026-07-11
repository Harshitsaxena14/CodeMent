const express = require("express");

const { getProblemBySlug } = require("../controllers/problemcontroller");

const router = express.Router();

// GET /api/problems/:slug
router.get("/:slug", getProblemBySlug);

module.exports = router;

