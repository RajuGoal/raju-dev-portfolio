import { Search } from "lucide-react";

export default function BlogToolbar({ categories, activeCategory, onCategoryChange, search, onSearchChange }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all
              ${activeCategory === cat
                ? "bg-amber-400 text-slate-900 border-amber-400 font-bold"
                : "bg-transparent text-slate-400 border-slate-700 hover:border-amber-400/60 hover:text-amber-300"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-64">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts or tags..."
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200
                     font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-amber-400"
        />
      </div>
    </div>
  );
}