import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function IssuesList({ issues }) {
  if (issues.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">Suggestions</h4>
      {issues.map((issue, i) => (
        <div key={i} className="flex gap-2 text-sm text-slate-300 bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <AlertTriangle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
          {issue}
        </div>
      ))}
    </div>
  );
}

export function WinsList({ wins }) {
  if (wins.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">What's Working</h4>
      {wins.map((win, i) => (
        <div key={i} className="flex gap-2 text-sm text-slate-300 bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <CheckCircle2 size={15} className="text-green-400 flex-shrink-0 mt-0.5" />
          {win}
        </div>
      ))}
    </div>
  );
}