import { Trash2 } from "lucide-react";
import { useVisitorLog } from "../../hooks/useVisitorLog";

export default function VisitorLogsPanel() {
  const { logs, clearLogs } = useVisitorLog();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-100">Visitor Logs ({logs.length})</h3>
        <button
          onClick={() => confirm("Clear all logs?") && clearLogs()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm hover:text-red-400"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto flex flex-col gap-2">
        {logs.map((l) => (
          <div key={l.id} className="bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>{new Date(l.time).toLocaleString()}</span>
              <span className="text-amber-400">{l.page}</span>
            </div>
            <p className="text-slate-500 truncate mt-1">ref: {l.referrer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}