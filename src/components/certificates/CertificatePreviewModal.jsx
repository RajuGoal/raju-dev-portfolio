// src/components/certificates/CertificatePreviewModal.jsx

import React, { useEffect } from "react";

export default function CertificatePreviewModal({ cert, onClose }) {
  useEffect(() => {
    if (!cert) return;

    const previousOverflow = document.body.style.overflow;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/40 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Brackets */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-slate-950/80 border border-slate-700 hover:border-amber-500 text-slate-400 hover:text-amber-400 transition-colors font-mono"
        >
          ✕
        </button>

        {/* Certificate Preview */}
        <div className="bg-slate-950 flex items-center justify-center min-h-[300px]">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full max-h-[500px] object-contain"
            />
          ) : (
            <span className="text-slate-700 font-mono text-6xl py-20">
              ▤
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-500/70">
            {cert.category}
          </span>

          <h3 className="mt-2 text-2xl font-bold text-slate-100">
            {cert.title}
          </h3>

          <p className="mt-1 text-slate-400">{cert.issuer}</p>

          <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-slate-500">
            <span>
              Issued:{" "}
              {new Date(cert.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            {cert.credentialId && (
              <span>Credential ID: {cert.credentialId}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-[10px] font-mono rounded border border-slate-700 bg-slate-800/60 text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {cert.fileUrl && (
              <a
                href={cert.fileUrl}
                download
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/60 text-amber-400 hover:bg-amber-500/20 transition-colors font-mono text-xs uppercase tracking-wider"
              >
                ⬇ Download
              </a>
            )}

            {cert.verifyUrl && (
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-700 text-slate-300 hover:border-emerald-500/60 hover:text-emerald-400 transition-colors font-mono text-xs uppercase tracking-wider"
              >
                ✓ Verify Credential →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}