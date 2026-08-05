import { useState, useMemo } from "react";

// ---- 1. Your skills data — edit this freely ----
const skillsData = [
  { name: "React", level: 90, category: "Frontend", icon: "⚛️" },
  { name: "JavaScript", level: 92, category: "Frontend", icon: "🟨" },
  { name: "Tailwind CSS", level: 88, category: "Frontend", icon: "🎨" },
  { name: "HTML/CSS", level: 95, category: "Frontend", icon: "🌐" },

  { name: "Node.js", level: 82, category: "Backend", icon: "🟢" },
  { name: "Express", level: 80, category: "Backend", icon: "🚂" },
  { name: "REST APIs", level: 85, category: "Backend", icon: "🔌" },

  { name: "MongoDB", level: 78, category: "Database", icon: "🍃" },
  { name: "MySQL", level: 75, category: "Database", icon: "🐬" },
  { name: "Firebase", level: 70, category: "Database", icon: "🔥" },

  { name: "AWS", level: 65, category: "Cloud", icon: "☁️" },
  { name: "Vercel", level: 85, category: "Cloud", icon: "▲" },

  { name: "Docker", level: 60, category: "DevOps", icon: "🐳" },
  { name: "CI/CD", level: 58, category: "DevOps", icon: "🔁" },
  { name: "Git & GitHub", level: 90, category: "DevOps", icon: "🐙" },

  { name: "Python", level: 80, category: "Programming", icon: "🐍" },
  { name: "Java", level: 70, category: "Programming", icon: "☕" },
  { name: "C++", level: 65, category: "Programming", icon: "💠" },

  { name: "VS Code", level: 95, category: "Tools", icon: "🧰" },
  { name: "Figma", level: 72, category: "Tools", icon: "🖌️" },
  { name: "Postman", level: 84, category: "Tools", icon: "📮" },

  { name: "TensorFlow", level: 60, category: "AI", icon: "🤖" },
  { name: "Prompt Engineering", level: 88, category: "AI", icon: "🧠" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Cloud", "DevOps", "Programming", "Tools", "AI"];

// ---- 2. Circular progress ring ----
function CircularProgress({ level, hovered }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-[-90deg]">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#1e293b"
        strokeWidth="8"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={hovered ? offset : circumference}
        className="transition-all duration-[1200ms] ease-out"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ---- 3. Individual skill card ----
function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border 
        bg-slate-900/60 backdrop-blur-sm cursor-pointer overflow-hidden
        transition-all duration-500 ease-out
        ${hovered ? "border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.35)] -translate-y-2 scale-105" : "border-slate-700"}
      `}
    >
      {/* corner brackets, matches blueprint theme */}
      <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-amber-400/0 group-hover:border-amber-400/70 transition-all duration-300" />
      <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-amber-400/0 group-hover:border-amber-400/70 transition-all duration-300" />

      <div className="relative flex items-center justify-center">
        <CircularProgress level={skill.level} hovered={hovered} />
        <span className="absolute text-2xl">{skill.icon}</span>
      </div>

      <p className="text-sm font-mono text-slate-200 tracking-wide">{skill.name}</p>

      <span
        className={`text-xs font-mono text-amber-400 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {skill.level}%
      </span>
    </div>
  );
}

// ---- 4. Main Skills Section ----
export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
      const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section className="bg-slate-950 py-20 px-6" id="skills">
      <div className="max-w-6xl mx-auto">
        {/* heading */}
        <div className="text-center mb-10">
          <p className="font-mono text-amber-400 text-sm tracking-[0.3em] mb-2">// SKILL MATRIX</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Technical Skills</h2>
        </div>

        {/* search bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 
                text-slate-200 font-mono text-sm rounded-lg px-4 py-3 pl-10 outline-none
                transition-colors duration-300"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          </div>
        </div>

        {/* category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide border transition-all duration-300
                ${
                  activeCategory === cat
                    ? "bg-amber-400 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    : "bg-transparent text-slate-400 border-slate-700 hover:border-amber-400 hover:text-amber-400"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* skill grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 font-mono">No skills found matching "{search}"</p>
        )}
      </div>
    </section>
  );
}