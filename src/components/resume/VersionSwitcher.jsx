export default function VersionSwitcher({ versions, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {versions.map((v) => (
        <button
          key={v.id}
          onClick={() => onChange(v)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono border transition-all
            ${
              active.id === v.id
                ? "bg-amber-400 text-slate-900 border-amber-400 font-bold"
                : "bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-400/60 hover:text-amber-300"
            }`}
        >
          <span>{v.icon}</span> {v.label}
        </button>
      ))}
    </div>
  );
}