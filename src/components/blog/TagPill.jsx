export default function TagPill({ tag, onClick, active = false }) {
  return (
    <button
      onClick={() => onClick?.(tag)}
      className={`px-2 py-0.5 text-[11px] font-mono rounded-md border transition-colors
        ${active
          ? "bg-amber-400 text-slate-900 border-amber-400"
          : "bg-slate-800 text-amber-300 border-slate-700 hover:border-amber-400/60"}`}
    >
      #{tag}
    </button>
  );
}