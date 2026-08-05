import { useState } from "react";
import { X, Github, ExternalLink, FileText, PlayCircle } from "lucide-react";
import TechBadge from "./TechBadge";
import StatBar from "./StatBar";

export default function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(project.screenshots[0]);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-amber-300 z-10 bg-slate-950/60 rounded-full p-1.5"
        >
          <X size={18} />
        </button>

        {/* Cover / video */}
        <div className="relative h-64">
          <img
            src={activeImg || project.cover}
            alt={project.title}
            className="w-full h-full object-cover rounded-t-2xl"
          />

          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-slate-950/40 hover:bg-slate-950/60 transition-colors rounded-t-2xl"
            >
              <PlayCircle size={56} className="text-amber-400" />
            </a>
          )}
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-amber-400 font-mono text-xs tracking-widest">
                {project.category}
              </p>
              <h2 className="text-2xl font-bold text-slate-100">
                {project.title}
              </h2>
            </div>

            <StatBar stats={project.stats} />
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
              Tech Stack
            </h4>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
              Key Features
            </h4>

            <ul className="space-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-amber-400">▹</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
              Architecture
            </h4>

            <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-amber-400/40 pl-3">
              {project.architecture}
            </p>
          </div>

          {/* Gallery */}
          {project.screenshots.length > 1 && (
            <div>
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                Gallery
              </h4>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {project.screenshots.map((src) => (
                  <img
                    key={src}
                    src={src}
                    onClick={() => setActiveImg(src)}
                    className={`h-16 w-24 object-cover rounded-md cursor-pointer border-2 flex-shrink-0
                      ${
                        activeImg === src
                          ? "border-amber-400"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-800">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-sm hover:bg-slate-700"
              >
                <Github size={14} /> GitHub
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-900 text-sm font-semibold hover:bg-amber-300"
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            )}

            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-sm hover:bg-slate-700"
              >
                <FileText size={14} /> Docs
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}