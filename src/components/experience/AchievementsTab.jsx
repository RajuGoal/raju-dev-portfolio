// src/components/experience/AchievementsTab.jsx
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { achievements } from "../../data/experienceData";

export default function AchievementsTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {achievements.map((item) => (
        <ExperienceCard key={item.id}>
          <div className="flex items-start gap-3">
            <span className="text-amber-400 text-2xl leading-none">★</span>
            <div>
              <h4 className="text-base font-semibold text-slate-100">
                {item.title}
              </h4>
              <p className="text-xs font-mono text-slate-500 mt-1">
                {item.org} · {item.date}
              </p>
              <p className="text-sm text-slate-400 mt-2">
                {item.description}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4"
                >
                  View Proof →
                </a>
              )}
            </div>
          </div>
        </ExperienceCard>
      ))}
    </div>
  );
}