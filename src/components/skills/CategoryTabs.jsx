export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider
                      border transition-all duration-200
                      ${
                        active === cat
                          ? "bg-amber-400 text-slate-900 border-amber-400 font-bold"
                          : "bg-transparent text-slate-400 border-slate-700 hover:border-amber-400/60 hover:text-amber-300"
                      }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}