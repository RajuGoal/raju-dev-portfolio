// src/components/experience/TimelineTab.jsx
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { timelineData } from "../../data/experienceData";

const typeColors = {
  education: "text-blue-400 border-blue-400/40",
  internship: "text-amber-400 border-amber-400/40",
  freelance: "text-emerald-400 border-emerald-400/40",
  project: "text-purple-400 border-purple-400/40",
};

export default function TimelineTab() {
  return (
    <div className="relative pl-6 md:pl-10">
      <div className="absolute left-2 md:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500/60 via-slate-700 to-transparent" />

      <div className="space-y-6">
        {timelineData.map((item, idx) => (
          <div key={item.id} className="relative">
            <div
              className={`absolute -left-[26px] md:-left-[34px] top-2 w-3 h-3 rounded-full border-2 bg-slate-950 ${
                typeColors[item.type]?.split(" ")[1] || "border-slate-500"
              }`}
            />
            <ExperienceCard>
              <span className="font-mono text-xs text-amber-500/80">
                {item.date}
              </span>
              <h4 className="text-lg font-semibold text-slate-100 mt-1">
                {item.title}
              </h4>
              <p className="text-sm text-slate-400">{item.org}</p>
              <p className="text-sm text-slate-500 mt-2">
                {item.description}
              </p>
              <span
                className={`inline-block mt-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border rounded ${
                  typeColors[item.type] || "text-slate-400 border-slate-600"
                }`}
              >
                {item.type}
              </span>
            </ExperienceCard>
          </div>
        ))}
      </div>
    </div>
  );
}