import { useState, useEffect } from "react";
import { Clock, Eye, MousePointerClick, Download } from "lucide-react";
import CountryChart from "./CountryChart";
import BreakdownBars from "./BreakdownBars";

// This panel goes in your ADMIN dashboard (section 20) — visitors never see this,
// only you do, after logging in.
export default function VisitorAnalyticsPanel() {
  const [sessions, setSessions] = useState([]);
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    setSessions(JSON.parse(localStorage.getItem("analytics-sessions") || "[]"));
    setClicks(JSON.parse(localStorage.getItem("analytics-clicks") || "[]"));
  }, []);

  const deviceBreakdown = {};
  const browserBreakdown = {};
  const referrerBreakdown = {};
  let totalTime = 0;
  let timedSessions = 0;

  sessions.forEach((s) => {
    deviceBreakdown[s.device] = (deviceBreakdown[s.device] || 0) + 1;
    browserBreakdown[s.browser] = (browserBreakdown[s.browser] || 0) + 1;
    referrerBreakdown[s.referrer] = (referrerBreakdown[s.referrer] || 0) + 1;
    if (s.timeSpent) {
      totalTime += s.timeSpent;
      timedSessions++;
    }
  });

  const avgTime = timedSessions ? Math.round(totalTime / timedSessions) : 0;

  const clickBreakdown = {};
  clicks.forEach((c) => (clickBreakdown[c.label] = (clickBreakdown[c.label] || 0) + 1));

  const downloadClicks = clicks.filter((c) => c.label.includes("download")).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox icon={Eye} label="Sessions" value={sessions.length} />
        <StatBox icon={Clock} label="Avg. Time" value={`${avgTime}s`} />
        <StatBox icon={MousePointerClick} label="Total Clicks" value={clicks.length} />
        <StatBox icon={Download} label="Downloads" value={downloadClicks} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">By Country</h4>
          <CountryChart sessions={sessions} />
        </div>

        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 flex flex-col gap-6">
          <BreakdownBars title="By Device" data={deviceBreakdown} />
          <BreakdownBars title="By Browser" data={browserBreakdown} />
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
        <BreakdownBars title="Referral Sources" data={referrerBreakdown} />
      </div>

      <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
        <BreakdownBars title="Top Clicked Elements" data={clickBreakdown} />
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
      <Icon size={20} className="text-amber-400 flex-shrink-0" />
      <div>
        <p className="text-xl font-bold font-mono text-slate-100">{value}</p>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}