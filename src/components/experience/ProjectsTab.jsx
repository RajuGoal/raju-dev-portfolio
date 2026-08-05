// src/components/experience/ProjectsTab.jsx
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { projects } from "../../data/experienceData";

export default function ProjectsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((item) => (
        <ExperienceCard key={item.id} className="flex flex-col">
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover border border-slate-700 mb-4"
            />
          )}
          <h4 className="text-lg font-semibold text-slate-100">
            {item.title}
          </h4>
          <p className="text-xs font-mono text-amber-400/80 mt-1">
            {item.role} · {item.duration}
          </p>
          <p className="text-sm text-slate-400 mt-3">{item.description}</p>

          <ul className="mt-3 space-y-1">
            {item.highlights.map((h, i) => (
              <li
                key={i}
                className="text-xs text-slate-500 flex items-start gap-2"
              >
                <span className="text-amber-500">▸</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
            {item.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono bg-slate-800/60 border border-slate-700 text-slate-300 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto pt-4">
            {item.liveLink && (
              <a
                href={item.liveLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-amber-400 hover:text-amber-300"
              >
                Live Demo →
              </a>
            )}
            {item.githubLink && (
              <a
                href={item.githubLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-slate-400 hover:text-slate-200"
              >
                GitHub →
              </a>
            )}
          </div>
        </ExperienceCard>
      ))}
    </div>
  );
}