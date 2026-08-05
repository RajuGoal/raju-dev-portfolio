import { useGitHubActivity } from "../../hooks/useGitHubActivity";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 1) return "just now";
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ActivityFeed() {
  const { activity, loading } = useGitHubActivity();

  if (loading) {
    return <p className="text-slate-500 font-mono text-sm">Loading activity...</p>;
  }

  if (activity.length === 0) {
    return <p className="text-slate-500 font-mono text-sm">No recent public activity.</p>;
  }

  return (
    <ul className="space-y-3">
      {activity.map((a) => (
        <li key={a.id} className="flex items-start gap-3 text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
          <p className="text-slate-300">
            <span className="text-slate-500">{a.label}</span>{" "}
            <span className="text-amber-300 font-mono">{a.repo}</span>
            <span className="text-slate-600 ml-2 text-xs">{timeAgo(a.date)}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}