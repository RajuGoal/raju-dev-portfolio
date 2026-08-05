export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 flex items-center gap-3 hover:border-amber-400/50 transition-colors">
      <Icon size={22} className="text-amber-400 flex-shrink-0" />
      <div>
        <p className="text-xl font-bold font-mono text-slate-100">{value}</p>
        <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}