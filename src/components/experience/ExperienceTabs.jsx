// src/components/experience/ExperienceTabs.jsx
import React from "react";

const TABS = [
  { id: "timeline", label: "Timeline", icon: "◈" },
  { id: "internship", label: "Internship", icon: "◆" },
  { id: "projects", label: "Projects", icon: "▣" },
  { id: "achievements", label: "Achievements", icon: "★" },
  { id: "volunteer", label: "Volunteer", icon: "♦" },
  { id: "freelance", label: "Freelance", icon: "⬢" },
];

export default function ExperienceTabs({ activeTab, onSwitch }) {
  return (
    <div className="relative flex flex-wrap gap-2 md:gap-3 mb-10 border-b border-amber-500/20 pb-4">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSwitch(tab.id)}
            className={`
              relative px-4 py-2 font-mono text-xs md:text-sm tracking-wider uppercase
              border transition-all duration-300 group
              ${
                isActive
                  ? "border-amber-500 text-amber-400 bg-amber-500/10"
                  : "border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-300"
              }
            `}
          >
            {/* corner brackets */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-amber-500/0 group-hover:border-amber-500/60 transition-colors" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-amber-500/0 group-hover:border-amber-500/60 transition-colors" />

            <span className="mr-2 opacity-70">{tab.icon}</span>
            {tab.label}

            {isActive && (
              <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-amber-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}