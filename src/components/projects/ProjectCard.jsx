import { useState } from "react";
import { Heart, Bookmark, Share2, Github, ExternalLink } from "lucide-react";
import TechBadge from "./TechBadge";
import StatBar from "./StatBar";
import { useShare } from "../../hooks/useShare";

export default function ProjectCard({ project, onOpen, index }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { share } = useShare();

  return (
    <div
      className="group relative bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden
                 hover:border-amber-400/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10
                 transition-all duration-300 animate-fadeInUp flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Cover image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
        {project.featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-amber-400 text-slate-900 text-[10px] font-bold font-mono rounded uppercase tracking-wider">
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 px-2 py-0.5 bg-slate-950/70 text-amber-300 text-[10px] font-mono rounded border border-slate-700">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2">{project.summary}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((t) => (
            <TechBadge key={t} name={t} />
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[11px] text-slate-500 font-mono">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <StatBar stats={project.stats} />

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-800">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-amber-300 transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-amber-300 transition-colors"
                title="Live Demo"
              >
                <ExternalLink size={16} />
              </a>
            )}

            <button
              onClick={() => setLiked((v) => !v)}
              className={`transition-colors ${
                liked ? "text-red-400" : "text-slate-400 hover:text-red-400"
              }`}
              title="Like"
            >
              <Heart size={16} fill={liked ? "currentColor" : "none"} />
            </button>

            <button
              onClick={() => setBookmarked((v) => !v)}
              className={`transition-colors ${
                bookmarked
                  ? "text-amber-400"
                  : "text-slate-400 hover:text-amber-400"
              }`}
              title="Bookmark"
            >
              <Bookmark
                size={16}
                fill={bookmarked ? "currentColor" : "none"}
              />
            </button>

            <button
              onClick={() =>
                share({
                  title: project.title,
                  text: project.summary,
                  url: project.liveUrl || project.githubUrl,
                })
              }
              className="text-slate-400 hover:text-amber-300 transition-colors"
              title="Share"
            >
              <Share2 size={15} />
            </button>
          </div>

          <button
            onClick={() => onOpen(project)}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 hover:underline"
          >
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
}