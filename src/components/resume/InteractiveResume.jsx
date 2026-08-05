import { interactiveResume } from "../../data/resumeData";

export default function InteractiveResume() {
  const { summary, experience, education, skills } = interactiveResume;

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6 md:p-8 flex flex-col gap-8">
      {/* Summary */}
      <div>
        <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
          Summary
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">{summary}</p>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
          Experience
        </h3>
        <div className="flex flex-col gap-4">
          {experience.map((exp, i) => (
            <div key={i} className="border-l-2 border-slate-700 pl-4 relative">
              <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-amber-400" />
              <p className="font-semibold text-slate-100 text-sm">{exp.role}</p>
              <p className="text-xs text-slate-500 font-mono mb-2">
                {exp.company} · {exp.period}
              </p>
              <ul className="space-y-1">
                {exp.points.map((pt, j) => (
                  <li key={j} className="text-sm text-slate-400 flex gap-2">
                    <span className="text-amber-400">▹</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
          Education
        </h3>
        {education.map((edu, i) => (
          <div key={i} className="border-l-2 border-slate-700 pl-4 relative">
            <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-amber-400" />
            <p className="font-semibold text-slate-100 text-sm">{edu.degree}</p>
            <p className="text-xs text-slate-500 font-mono">
              {edu.institute} · {edu.period}
            </p>
            <p className="text-sm text-slate-400 mt-1">{edu.details}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="px-3 py-1 text-xs font-mono rounded-full bg-slate-800 text-amber-300 border border-slate-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}