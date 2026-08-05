import { Github, Star, GitFork, BookMarked, Users } from "lucide-react";
import { useGitHubStats } from "../../hooks/useGitHubStats";
import { useGitHubPinned } from "../../hooks/useGitHubPinned";
import StatCard from "./StatCard";
import LanguageBar from "./LanguageBar";
import ContributionGraph from "./ContributionGraph";
import PinnedRepoCard from "./PinnedRepoCard";
import ActivityFeed from "./ActivityFeed";

export default function GitHubSection() {
  const { user, repos, languages, totalStars, totalForks, loading, error } =
    useGitHubStats();
  const { pinned, loading: pinnedLoading } = useGitHubPinned();

  return (
    <section id="github" className="relative py-20 px-6 bg-slate-950">
      <div className="text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          Fig. 06 — GITHUB DASHBOARD
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
          Live From GitHub
        </h2>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {loading && (
          <p className="text-center text-slate-500 font-mono">
            Fetching GitHub data...
          </p>
        )}

        {error && (
          <p className="text-center text-red-400 font-mono text-sm">
            Couldn't load GitHub data: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                icon={BookMarked}
                label="Repositories"
                value={user?.public_repos ?? 0}
              />
              <StatCard
                icon={Star}
                label="Total Stars"
                value={totalStars}
              />
              <StatCard
                icon={GitFork}
                label="Total Forks"
                value={totalForks}
              />
              <StatCard
                icon={Users}
                label="Followers"
                value={user?.followers ?? 0}
              />
            </div>

            {/* Language breakdown */}
            <div>
              <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
                Top Languages
              </h3>
              <LanguageBar languages={languages} />
            </div>

            {/* Contribution graph */}
            <div>
              <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
                Contribution Graph
              </h3>
              <ContributionGraph />
            </div>

            {/* Pinned repos */}
            {!pinnedLoading && pinned.length > 0 && (
              <div>
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Pinned Projects
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pinned.map((repo) => (
                    <PinnedRepoCard key={repo.repo} repo={repo} />
                  ))}
                </div>
              </div>
            )}

            {/* Recent activity */}
            <div>
              <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-3">
                Recent Activity
              </h3>

              <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-5">
                <ActivityFeed />
              </div>
            </div>

            {/* View on GitHub CTA */}
            <div className="text-center">
              <a
                href={user?.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:border-amber-400 hover:text-amber-300 transition-colors font-mono text-sm"
              >
                <Github size={16} />
                View Full Profile
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}