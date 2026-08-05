import { SpellCheck } from "lucide-react";

export default function GrammarPanel({ findings }) {
  if (findings.length === 0) {
    return (
      <p className="text-sm text-green-400 font-mono flex items-center gap-2">
        <SpellCheck size={16} /> No major style issues detected.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {findings.map((f, i) => (
        <div key={i} className="flex gap-2 text-sm text-slate-300 bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <span className="text-[10px] font-mono uppercase text-amber-400 border border-amber-400/40 rounded px-1.5 py-0.5 h-fit flex-shrink-0">
            {f.type}
          </span>
          {f.message}
        </div>
      ))}
    </div>
  );
}