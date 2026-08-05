// src/components/certificates/CertificateSearch.jsx
import React from "react";

export default function CertificateSearch({ value, onChange }) {
  return (
    <div className="relative w-full md:w-72">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500/60 font-mono text-sm">
        ⌕
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search certificates..."
        className="
          w-full bg-slate-900/60 border border-slate-700
          focus:border-amber-500/60 focus:outline-none
          text-slate-200 placeholder-slate-500
          font-mono text-sm pl-9 pr-3 py-2
          transition-colors
        "
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-amber-400 text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
}