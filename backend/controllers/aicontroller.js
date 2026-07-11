const { GoogleGenAI } = require("@google/genai");

function getRequestText(body) {
  if (!body || typeof body !== "object") return undefined;
  if (typeof body.text === "string") return body.text;
  // Backward compatibility (if frontend still sends `message`)
  if (typeof body.message === "string") return body.message;
  return undefined;
}

function extractGeminiText(result) {
  // The @google/genai response object shape can vary by SDK version.
  // Try common locations defensively.
  try {
    if (!result) return undefined;

    // Some SDKs return: { response: { text: () => string } }
    if (result.response && typeof result.response.text === "function") {
      return result.response.text();
    }

    // Sometimes text can be directly present.
    if (typeof result.text === "string") return result.text;

    if (
      Array.isArray(result.candidates) &&
      result.candidates[0]?.content?.parts?.length
    ) {
      const parts = result.candidates[0].content.parts;
      const firstTextPart = parts.find((p) => typeof p?.text === "string");
      if (firstTextPart) return firstTextPart.text;
    }
  } catch {
    // fall through to undefined
  }

  return undefined;
}

async function askAI(req, res) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "API key should be set when using the Gemini API" });
    }

    const text = getRequestText(req.body);
    if (typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        message: "Missing or invalid request body. Provide JSON: { \"text\": \"...\" }"
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: text.trim() }]
        }
      ]
    });

    const replyText = extractGeminiText(result);
    if (!replyText) {
      return res.status(502).json({
        message: "Gemini response did not include text output.",
      });
    }

    return res.json({ reply: replyText });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { askAI };

