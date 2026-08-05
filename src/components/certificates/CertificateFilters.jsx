// src/components/certificates/CertificateFilters.jsx
import React from "react";
import { certificateCategories } from "../../data/certificatesData";

export default function CertificateFilters({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {certificateCategories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`
              px-3 py-1.5 text-xs font-mono uppercase tracking-wider
              border transition-all duration-200
              ${
                isActive
                  ? "border-amber-500 text-amber-400 bg-amber-500/10"
                  : "border-slate-700 text-slate-400 hover:border-amber-500/40 hover:text-amber-300"
              }
            `}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}