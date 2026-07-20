const Problem = require("../models/problemmodel");
const { GoogleGenAI } = require("@google/genai");

function extractGeminiText(result) {
  try {
    if (!result) return undefined;
    if (result.response && typeof result.response.text === "function") {
      return result.response.text();
    }
    if (typeof result.text === "string") return result.text;
    if (Array.isArray(result.candidates) && result.candidates[0]?.content?.parts?.length) {
      const parts = result.candidates[0].content.parts;
      const firstTextPart = parts.find((p) => typeof p?.text === "string");
      if (firstTextPart) return firstTextPart.text;
    }
  } catch {
    // ignore
  }
  return undefined;
}

const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, tags } = req.query;

    if (!slug) {
      return res.status(400).json({ message: "Missing slug" });
    }

    // 1. Search existing problem in MongoDB (official or previously generated)
    let problem = await Problem.findOne({ slug });

    if (problem) {
      return res.json(problem);
    }

    // 2. If problem not found and user query has title, trigger AI Generation if key is set
    const apiKey = process.env.GEMINI_API_KEY;
    if (title && apiKey) {
      try {
        console.log(`Backend Problem Controller: Generating AI metadata for ${title} (${slug})...`);
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `Generate a JSON object matching the following structure for the LeetCode problem "${title}" with slug "${slug}" and tags "${tags || ""}".
Structure:
{
  "title": "${title}",
  "slug": "${slug}",
  "difficulty": "Medium",
  "topic": "Arrays",
  "pattern": "HashMap Complements",
  "complexity": {
    "time": "O(N)",
    "space": "O(N)"
  },
  "logic": "A short summary of the general logic/strategy to solve this problem.",
  "hints": [
    "Hint 1...",
    "Hint 2...",
    "Hint 3..."
  ],
  "commonMistakes": [
    "Common mistake 1...",
    "Common mistake 2..."
  ],
  "mistakes": [
    "Common mistake 1...",
    "Common mistake 2..."
  ],
  "edgeCases": [
    "Edge case 1...",
    "Edge case 2..."
  ]
}
Do not return any markdown wraps (like \`\`\`json) or conversational text. Output ONLY the pure raw JSON string.`;

        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: prompt.trim() }]
            }
          ]
        });

        let rawText = extractGeminiText(result);
        if (rawText) {
          // Clean possible markdown wrapper syntax if generated
          rawText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(rawText);

          // Standardize fields
          const mistakesArr = parsed.mistakes || parsed.commonMistakes || [];
          
          problem = await Problem.create({
            title: parsed.title || title,
            slug: slug,
            difficulty: parsed.difficulty || "Medium",
            topic: parsed.topic || "General DSA",
            pattern: parsed.pattern || "General Pattern",
            complexity: parsed.complexity || { time: "O(N)", space: "O(N)" },
            logic: parsed.logic || "",
            hints: parsed.hints || [],
            commonMistakes: mistakesArr,
            mistakes: mistakesArr,
            edgeCases: parsed.edgeCases || [],
            source: "AI"
          });

          console.log(`Backend Problem Controller: Successfully generated and cached problem: ${slug}`);
          return res.json(problem);
        }
      } catch (aiError) {
        console.error("Backend Problem Controller: AI generation failed:", aiError.message);
        // Fall through to 404 so extension can apply local heuristics
      }
    }

    return res.status(404).json({ message: "Problem not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = { getProblemBySlug };
