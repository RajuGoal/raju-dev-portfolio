export default function BreakdownBars({ title, data }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">{title}</h4>
      <div className="flex flex-col gap-2">
        {entries.map(([label, count]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-xs text-slate-400 w-20 truncate">{label}</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 font-mono w-8 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}