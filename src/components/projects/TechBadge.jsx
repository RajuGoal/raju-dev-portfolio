export default function TechBadge({ name }) {
  return (
    <span className="px-2 py-0.5 text-[11px] font-mono rounded-md bg-slate-800 text-amber-300 border border-slate-700">
      {name}
    </span>
  );
}