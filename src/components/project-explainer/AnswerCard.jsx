import { Sparkles, FolderGit2 } from "lucide-react";

export default function AnswerCard({ question, answer, project, source }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 flex flex-col gap-3 animate-fadeInUp">
      <p className="text-sm text-slate-400 font-mono">Q: {question}</p>

      <div className="flex items-start gap-2 pt-3 border-t border-slate-800">
        <Sparkles size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{answer}</p>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono pt-2">
        {project && (
          <span className="flex items-center gap-1">
            <FolderGit2 size={11} /> {project}
          </span>
        )}
        <span>{source === "ai" ? "AI-generated" : "Instant answer"}</span>
      </div>
    </div>
  );
}