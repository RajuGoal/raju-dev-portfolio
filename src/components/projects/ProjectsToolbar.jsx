export default function ProjectsToolbar({
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all
              ${
                activeCategory === cat
                  ? "bg-amber-400 text-slate-900 border-amber-400 font-bold"
                  : "bg-transparent text-slate-400 border-slate-700 hover:border-amber-400/60 hover:text-amber-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="flex-1 md:w-56 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700
                     text-slate-200 font-mono text-sm placeholder-slate-500
                     focus:outline-none focus:border-amber-400"
        />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200
                     font-mono text-sm focus:outline-none focus:border-amber-400"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Viewed</option>
          <option value="liked">Most Liked</option>
          <option value="az">A → Z</option>
        </select>
      </div>
    </div>
  );
}