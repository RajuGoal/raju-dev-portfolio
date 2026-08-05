// src/components/experience/FreelanceTab.jsx
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { freelanceWork } from "../../data/experienceData";

export default function FreelanceTab() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {freelanceWork.map((item) => (
        <ExperienceCard key={item.id}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div>
              <h4 className="text-lg font-semibold text-slate-100">
                {item.project}
              </h4>
              <p className="text-xs font-mono text-amber-400/80">
                {item.client}
              </p>
            </div>
            <p className="text-xs font-mono text-slate-500">
              {item.duration}
            </p>
          </div>

          <p className="text-sm text-slate-400 mt-3">{item.description}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono bg-slate-800/60 border border-slate-700 text-slate-300 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {item.testimonial && (
            <blockquote className="mt-4 text-sm italic text-slate-400 border-l-2 border-amber-500/40 pl-4">
              "{item.testimonial}"
            </blockquote>
          )}

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              View Work →
            </a>
          )}
        </ExperienceCard>
      ))}
    </div>
  );
}