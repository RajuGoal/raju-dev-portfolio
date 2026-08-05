import { Eye, Users, Clock, TrendingUp } from "lucide-react";
import { useVisitorLog } from "../../hooks/useVisitorLog";

export default function AnalyticsPanel() {
  const { logs } = useVisitorLog();

  const today = new Date().toDateString();
  const visitsToday = logs.filter((l) => new Date(l.time).toDateString() === today).length;
  const uniquePages = new Set(logs.map((l) => l.page)).size;

  const topReferrers = Object.entries(
    logs.reduce((acc, l) => {
      acc[l.referrer] = (acc[l.referrer] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox icon={Eye} label="Total Visits" value={logs.length} />
        <StatBox icon={TrendingUp} label="Today" value={visitsToday} />
        <StatBox icon={Users} label="Pages Visited" value={uniquePages} />
        <StatBox icon={Clock} label="Last Visit" value={logs[0] ? new Date(logs[0].time).toLocaleTimeString() : "—"} small />
      </div>

      <div>
        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Top Referrers</h4>
        <div className="flex flex-col gap-2">
          {topReferrers.map(([ref, count]) => (
            <div key={ref} className="flex items-center justify-between bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2 text-sm">
              <span className="text-slate-300 truncate">{ref}</span>
              <span className="text-amber-400 font-mono">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value, small }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
      <Icon size={20} className="text-amber-400 flex-shrink-0" />
      <div>
        <p className={`font-bold font-mono text-slate-100 ${small ? "text-sm" : "text-xl"}`}>{value}</p>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}