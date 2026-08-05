import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { answerProjectQuestion } from "../../lib/projectExplainerEngine";
import { suggestedPrompts } from "../../data/explainerPrompts";
import PromptChips from "./PromptChips";
import AnswerCard from "./AnswerCard";

export default function ProjectExplainerSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (question) => {
    if (!question.trim()) return;
    setInput("");

    // Instant local answer first — always works, zero latency
    const { answer, project } = answerProjectQuestion(question);
    const entry = { question, answer, project, source: "local" };
    setHistory((h) => [entry, ...h]);

    // Optional: try upgrading to a real AI answer in the background.
    // Uses the same serverless endpoint pattern from the Resume Reviewer section.
    setLoading(true);
    try {
      const res = await fetch("/api/explain-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (res.ok) {
        const data = await res.json();
        setHistory((h) =>
          h.map((item) =>
            item === entry ? { ...item, answer: data.answer, source: "ai" } : item
          )
        );
      }
    } catch {
      // silently keep the local answer — no error shown, it already works
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="project-explainer" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-8">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">FIG. 17 — PROJECT Q&A</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Ask About My Projects</h2>
        <p className="text-slate-400 text-sm mt-2">
          Ask what a project does, how it's built, or why I made certain decisions.
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <PromptChips prompts={suggestedPrompts} onSelect={handleAsk} />

        <form
          onSubmit={(e) => { e.preventDefault(); handleAsk(input); }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Explain the architecture of HouseHunt"
            className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm
                       focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-4 rounded-lg bg-amber-400 text-slate-900 hover:bg-amber-300 transition-colors flex items-center justify-center"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {history.map((h, i) => (
            <AnswerCard key={i} {...h} />
          ))}
        </div>
      </div>
    </section>
  );
}