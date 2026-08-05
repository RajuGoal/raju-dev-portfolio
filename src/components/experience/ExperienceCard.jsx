// src/components/experience/ExperienceCard.jsx
import React from "react";

export default function ExperienceCard({ children, className = "" }) {
  return (
    <div
      className={`
        relative bg-slate-900/60 border border-slate-700/60
        hover:border-amber-500/50 transition-all duration-300
        p-6 backdrop-blur-sm group
        ${className}
      `}
    >
      {/* blueprint corner brackets */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors" />

      {children}
    </div>
  );
}