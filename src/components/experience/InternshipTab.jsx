// src/components/experience/InternshipTab.jsx
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { internships } from "../../data/experienceData";

export default function InternshipTab() {
  if (!internships.length) {
    return (
      <p className="text-slate-500 font-mono text-sm">
        // No internships added yet
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {internships.map((item) => (
        <ExperienceCard key={item.id}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div>
              <h4 className="text-xl font-semibold text-slate-100">
                {item.role}
              </h4>
              <p className="text-amber-400 font-mono text-sm">
                {item.company}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-slate-500">
                {item.duration}
              </p>
              <p className="text-xs font-mono text-slate-600">
                {item.location}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-400 mt-4">{item.description}</p>

          <ul className="mt-4 space-y-2">
            {item.responsibilities.map((r, i) => (
              <li
                key={i}
                className="text-sm text-slate-400 flex items-start gap-2"
              >
                <span className="text-amber-500 mt-1">▸</span>
                {r}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-slate-800/60 border border-slate-700 text-slate-300 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {item.certificateLink && (
            <a
              href={item.certificateLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              View Certificate →
            </a>
          )}
        </ExperienceCard>
      ))}
    </div>
  );
}