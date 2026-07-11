  import { useState, useCallback } from "react";
  import API from "../api/axios";

  const AI_PROMPT_INSTRUCTIONS =
    "You are CodeMent AI Mentor.\n" +
    "Help students learn DSA.\n" +
    "Explain concepts clearly.\n" +
    "Give hints before solutions.\n" +
    "Avoid giving full answers unless requested.\n\n" +
    "Student question:\n";

  function AIMentor() {   
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState("");
    const [error, setError] = useState("");
  
    const handleAsk = useCallback(async () => {
      const trimmedQuestion = question.trim();
      if (!trimmedQuestion) {
        setError("Please enter a question.");
        setReply("");
        return;
      }
  
      setLoading(true);
      setError("");
      setReply("");
  
      try {
        const finalPrompt = AI_PROMPT_INSTRUCTIONS + trimmedQuestion;
  
        const res = await API.post("/ai", {
          text: finalPrompt,
        });
  
        setReply(res?.data?.reply || "");
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while getting AI response."
        );
      } finally {
        setLoading(false);
      }
    }, [question]);
  
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-10">AI Mentor</h1>

        <div className="max-w-3xl bg-gray-900 p-6 rounded-xl">
          <label className="block mb-2 font-semibold">Your question</label>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 outline-none min-h-[140px]"
            placeholder="Ask about DSA concepts, approach, or hints..."
          />

          {error ? (
            <p className="mt-3 text-red-400">{error}</p>
          ) : null}

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleAsk}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2 rounded-lg font-semibold"
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </div>

          {reply ? (
            <div className="mt-7">
              <h2 className="font-semibold text-lg mb-2">AI Reply</h2>
              <div className="whitespace-pre-wrap bg-black p-4 rounded-lg border border-gray-700">
                {reply}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  export default AIMentor;
