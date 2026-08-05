const COLORS = [
  "#f59e0b", "#38bdf8", "#a78bfa", "#34d399",
  "#f472b6", "#fb923c", "#facc15", "#94a3b8",
];

export default function LanguageBar({ languages }) {
  const entries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  if (total === 0) return null;

  return (
    <div>
      <div className="flex h-2.5 rounded-full overflow-hidden border border-slate-800">
        {entries.map(([lang, count], i) => (
          <div
            key={lang}
            style={{
              width: `${(count / total) * 100}%`,
              backgroundColor: COLORS[i % COLORS.length],
            }}
            title={`${lang}: ${count}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        {entries.slice(0, 8).map(([lang, count], i) => (
          <span key={lang} className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            {lang} · {((count / total) * 100).toFixed(0)}%
          </span>
        ))}
      </div>
    </div>
  );
}