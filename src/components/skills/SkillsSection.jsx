import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { skills, skillCategories } from "../../data/skillsData";
import CategoryTabs from "./CategoryTabs";
import SkillCard from "./SkillCard";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Add "All" category
  const categories = ["All", ...skillCategories];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === "All" ||
        skill.category === activeCategory;

      const matchesSearch = skill.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section
      id="skills"
      className="relative py-20 px-6 bg-slate-950 overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          Fig. 04 — SKILLS
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
          Tools I Build With
        </h2>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8 relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-900 border border-slate-700
          text-slate-200 font-mono text-sm placeholder-slate-500
          focus:outline-none focus:border-amber-400 transition-colors"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-400 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="animate-fadeUp opacity-0"
              style={{
                animationDelay: `${index * 40}ms`,
                animationFillMode: "forwards",
              }}
            >
              <SkillCard
                skill={skill}
                index={index}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 font-mono">
          No skills match "{search}"
        </p>
      )}
    </section>
  );
}