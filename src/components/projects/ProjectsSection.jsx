import { useState, useMemo } from "react";
import { projects, projectCategories } from "../../data/projectsData";
import ProjectsToolbar from "./ProjectsToolbar";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });

    switch (sortBy) {
      case "popular":
        list = [...list].sort((a, b) => b.stats.views - a.stats.views);
        break;
      case "liked":
        list = [...list].sort((a, b) => b.stats.likes - a.stats.likes);
        break;
      case "az":
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return list;
  }, [activeCategory, search, sortBy]);

  return (
    <section id="projects" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          Fig. 05 — Profile
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
          Things I've Built
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <ProjectsToolbar
          categories={projectCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          search={search}
          onSearchChange={setSearch}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 font-mono py-10">
            No projects match your search.
          </p>
        )}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}