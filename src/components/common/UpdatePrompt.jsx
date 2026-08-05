import { RefreshCw } from "lucide-react";
import { usePWAUpdate } from "../../hooks/usePWAUpdate";

export default function UpdatePrompt() {
  const { needsRefresh, applyUpdate } = usePWAUpdate();

  if (!needsRefresh) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] bg-slate-900 border border-amber-400/50 rounded-xl p-4 flex items-center gap-3 shadow-xl animate-fadeInUp">
      <RefreshCw size={16} className="text-amber-400" />
      <p className="text-sm text-slate-200">A new version is available.</p>
      <button
        onClick={applyUpdate}
        className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-900 text-xs font-bold hover:bg-amber-300"
      >
        Refresh
      </button>
    </div>
  );
}