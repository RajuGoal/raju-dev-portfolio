// src/components/certificates/CertificateCard.jsx
import React from "react";

export default function CertificateCard({ cert, onPreview, index }) {
  return (
    <div
      className="
        relative bg-slate-900/60 border border-slate-700/60
        hover:border-amber-500/50 transition-all duration-300
        group overflow-hidden cursor-pointer
        animate-fadeInUp
      "
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onPreview(cert)}
    >
      {/* corner brackets */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/40 group-hover:border-amber-500 transition-colors z-10" />

      {/* thumbnail */}
      <div className="relative h-40 bg-slate-800/80 overflow-hidden">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-4xl">
            ▤
          </div>
        )}
        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400 font-mono text-xs uppercase tracking-widest">
            Click to Preview
          </span>
        </div>
      </div>

      <div className="p-4">
        <span className="font-mono text-[10px] text-amber-500/70 uppercase tracking-wider">
          {cert.category}
        </span>
        <h4 className="text-sm font-semibold text-slate-100 mt-1 line-clamp-2">
          {cert.title}
        </h4>
        <p className="text-xs text-slate-500 mt-1">{cert.issuer}</p>
        <p className="text-[10px] font-mono text-slate-600 mt-2">
          {new Date(cert.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}