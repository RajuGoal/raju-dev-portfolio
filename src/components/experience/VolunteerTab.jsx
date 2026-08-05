// src/components/experience/VolunteerTab.jsx
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { volunteerWork } from "../../data/experienceData";

export default function VolunteerTab() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {volunteerWork.map((item) => (
        <ExperienceCard key={item.id}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <div>
              <h4 className="text-lg font-semibold text-slate-100">
                {item.role}
              </h4>
              <p className="text-emerald-400 font-mono text-sm">
                {item.org}
              </p>
            </div>
            <p className="text-xs font-mono text-slate-500">
              {item.duration}
            </p>
          </div>
          <p className="text-sm text-slate-400 mt-3">{item.description}</p>
          <p className="text-xs font-mono text-emerald-400/80 mt-3 border-l-2 border-emerald-500/40 pl-3">
            {item.impact}
          </p>
        </ExperienceCard>
      ))}
    </div>
  );
}