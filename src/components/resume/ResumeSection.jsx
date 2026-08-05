import { useState } from "react";
import { LayoutList, FileText } from "lucide-react";
import { resumeVersions } from "../../data/resumeData";
import VersionSwitcher from "./VersionSwitcher";
import PDFPreview from "./PDFPreview";
import InteractiveResume from "./InteractiveResume";

export default function ResumeSection() {
  const [activeVersion, setActiveVersion] = useState(resumeVersions[0]);
  const [mode, setMode] = useState("pdf"); // "pdf" | "interactive"

  return (
    <section id="resume" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-8">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          FIG. 13 — RESUME
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
          My Resume
        </h2>
      </div>

      {/* Mode toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setMode("pdf")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono border transition-colors
            ${mode === "pdf"
              ? "bg-slate-800 text-amber-300 border-amber-400/60"
              : "bg-transparent text-slate-500 border-slate-700 hover:text-slate-300"}`}
        >
          <FileText size={14} /> PDF View
        </button>
        <button
          onClick={() => setMode("interactive")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono border transition-colors
            ${mode === "interactive"
              ? "bg-slate-800 text-amber-300 border-amber-400/60"
              : "bg-transparent text-slate-500 border-slate-700 hover:text-slate-300"}`}
        >
          <LayoutList size={14} /> Interactive View
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {mode === "pdf" ? (
          <>
            <VersionSwitcher
              versions={resumeVersions}
              active={activeVersion}
              onChange={setActiveVersion}
            />
            <PDFPreview version={activeVersion} />
          </>
        ) : (
          <InteractiveResume />
        )}
      </div>
    </section>
  );
}