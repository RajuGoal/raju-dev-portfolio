import { Star, GitFork } from "lucide-react";

export default function PinnedRepoCard({ repo }) {
  return (
    <a
      href={repo.link}
      target="_blank"
      rel="noreferrer"
      className="block bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-amber-400/60 hover:-translate-y-1 transition-all duration-300"
    >
      <p className="font-mono text-sm text-amber-300 font-semibold mb-1">
        📌 {repo.repo}
      </p>

      <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[2rem]">
        {repo.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: repo.languageColor || "#f59e0b" }}
            />
            {repo.language}
          </span>
        )}

        <span className="flex items-center gap-1">
          <Star size={12} /> {repo.stars}
        </span>

        <span className="flex items-center gap-1">
          <GitFork size={12} /> {repo.forks}
        </span>
      </div>
    </a>
  );
}