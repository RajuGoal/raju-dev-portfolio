import CircularProgress from "./CircularProgress";
import { categoryMeta } from "./categoryMeta";

export default function SkillCard({ skill, index = 0 }) {
  const meta = categoryMeta[skill.category];

  // Prevent errors if category doesn't exist
  if (!meta) {
    return null;
  }

  const Icon = meta.icon;

  return (
    <div
      className="group relative [perspective:1000px] h-48 animate-fadeInUp"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Blueprint Corner Brackets */}
      <span className="absolute top-1 left-1 z-20 w-3 h-3 border-t-2 border-l-2 border-amber-400/0 group-hover:border-amber-400/70 transition-all duration-300" />
      <span className="absolute bottom-1 right-1 z-20 w-3 h-3 border-b-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/70 transition-all duration-300" />

      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        {/* FRONT */}
        <div
          className="absolute inset-0 [backface-visibility:hidden]
          bg-slate-900/60 border border-slate-700 rounded-xl
          flex flex-col items-center justify-center gap-3 p-5
          hover:border-amber-400/60 hover:shadow-lg
          hover:shadow-amber-500/10 transition-all duration-300"
        >
          {/* Skill Icon */}
          <span className="text-2xl">{skill.icon}</span>

          {/* Progress */}
          <CircularProgress
            value={skill.proficiency ?? skill.level}
            color={meta.color}
          />

          {/* Name */}
          <p className="font-mono text-sm text-slate-200 text-center group-hover:text-amber-300 transition-colors">
            {skill.name}
          </p>

          {/* Category */}
          <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
            <Icon size={11} style={{ color: meta.color }} />
            <span>{skill.category}</span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 [backface-visibility:hidden]
          [transform:rotateY(180deg)]
          rounded-xl p-4 flex flex-col justify-center gap-3 border"
          style={{
            backgroundColor: "#0B1E3A",
            borderColor: meta.color,
          }}
        >
          <div className="flex items-center gap-2">
            <Icon size={18} style={{ color: meta.color }} />
            <p className="text-sm font-semibold text-white">
              {skill.name}
            </p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {skill.note}
          </p>

          <p
            className="text-[11px] font-mono"
            style={{ color: meta.color }}
          >
            {skill.years}{" "}
            {skill.years === 1 ? "year" : "years"} experience
          </p>
        </div>

      </div>
    </div>
  );
}