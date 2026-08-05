export default function PromptChips({ prompts, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((p) => (
        <button
          key={p}
          onClick={() => onSelect(p)}
          className="px-3 py-1.5 text-xs font-mono rounded-full bg-slate-900 border border-slate-700
                     text-slate-300 hover:border-amber-400/60 hover:text-amber-300 transition-colors"
        >
          {p}
        </button>
      ))}
    </div>
  );
}