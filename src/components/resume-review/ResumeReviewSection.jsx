import { useState } from "react";
import { extractTextFromPDF } from "../../lib/resumeParser";
import { scoreResume } from "../../lib/atsScorer";
import { checkGrammar } from "../../lib/grammarChecker";
import UploadZone from "./UploadZone";
import ScoreGauge from "./ScoreGauge";
import { IssuesList, WinsList } from "./FindingsList";
import GrammarPanel from "./GrammarPanel";

export default function ResumeReviewSection() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [aiError, setAiError] = useState(null);

  const handleFile = async (file) => {
    setLoading(true);
    setResult(null);
    setAiSummary(null);
    setAiError(null);

    try {
      const text = await extractTextFromPDF(file);
      const atsResult = scoreResume(text);
      const grammarFindings = checkGrammar(text);
      setResult({ ...atsResult, grammarFindings });

      // Optional: call your backend AI endpoint for a deeper qualitative review.
      // Comment this out if you haven't deployed the serverless function yet.
      try {
        const res = await fetch("/api/review-resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText: text }),
        });
        if (res.ok) {
          const data = await res.json();
          setAiSummary(data.summary);
        }
      } catch {
        setAiError("AI review unavailable — showing rule-based analysis only.");
      }
    } catch (err) {
      console.error(err);
      alert("Couldn't read that PDF. Try a different file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="resume-review" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">FIG. 16 — RESUME REVIEWER</p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">AI Resume Reviewer</h2>
        <p className="text-slate-400 text-sm mt-2">Upload your resume for an instant ATS score and suggestions</p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <UploadZone onFileReady={handleFile} loading={loading} />

        {result && (
          <div className="flex flex-col gap-8 animate-fadeInUp">
            <ScoreGauge score={result.score} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WinsList wins={result.wins} />
              <IssuesList issues={result.issues} />
            </div>

            <div>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Grammar & Style</h4>
              <GrammarPanel findings={result.grammarFindings} />
            </div>

            {aiSummary && (
              <div>
                <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">AI Deep Review</h4>
                <p className="text-sm text-slate-300 bg-slate-900/60 border border-amber-400/30 rounded-lg p-4 leading-relaxed whitespace-pre-line">
                  {aiSummary}
                </p>
              </div>
            )}
            {aiError && <p className="text-xs text-slate-500 font-mono">{aiError}</p>}
          </div>
        )}
      </div>
    </section>
  );
}