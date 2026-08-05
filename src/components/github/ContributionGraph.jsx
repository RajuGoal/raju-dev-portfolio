import { GITHUB_USERNAME } from "../../data/githubConfig";

// Renders GitHub's contribution graph via a themed SVG image service (no API key needed)
export default function ContributionGraph() {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 overflow-x-auto">
      <img
        src={`https://ghchart.rshah.org/f59e0b/${GITHUB_USERNAME}`}
        alt="GitHub contribution graph"
        className="min-w-[600px] w-full"
      />
    </div>
  );
}