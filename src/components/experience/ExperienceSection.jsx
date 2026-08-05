// src/components/experience/ExperienceSection.jsx
import React from "react";
import ExperienceTabs from "./ExperienceTabs";
import TimelineTab from "./TimelineTab";
import InternshipTab from "./InternshipTab";
import ProjectsTab from "./ProjectsTab";
import AchievementsTab from "./AchievementsTab";
import VolunteerTab from "./VolunteerTab";
import FreelanceTab from "./FreelanceTab";
import { useTabTransition } from "../../hooks/useTabTransition";

const TAB_COMPONENTS = {
  timeline: TimelineTab,
  internship: InternshipTab,
  projects: ProjectsTab,
  achievements: AchievementsTab,
  volunteer: VolunteerTab,
  freelance: FreelanceTab,
};

export default function ExperienceSection() {
  const { activeTab, switchTab, isTransitioning } = useTabTransition("timeline");
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <section
      id="experience"
      className="relative py-24 px-6 md:px-12 bg-slate-950 overflow-hidden"
    >
      {/* background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-xs text-amber-500/70 tracking-widest uppercase">
            Fig. 08 — EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mt-2">
            Where I've Been, What I've Built
          </h2>
        </div>

        <ExperienceTabs activeTab={activeTab} onSwitch={switchTab} />

        <div
          className={`transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          <ActiveComponent />
        </div>
      </div>
    </section>
  );
}