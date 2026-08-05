import { useEffect, useRef } from "react";

// Soft, slow-drifting aurora glow — fixed behind the entire site, all sections sit on top of it.
// Pure CSS/SVG blur, no canvas — cheap on performance, works everywhere.
export default function AuroraBackground() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[color:var(--bg-base)]"
    >
      {/* Base grid texture — keeps your blueprint identity underneath the color */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Aurora blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Fade to base color at the very bottom so it doesn't look cut off on a long page */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[color:var(--bg-base)] to-transparent" />
    </div>
  );
}