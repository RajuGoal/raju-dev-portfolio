import { useCountUp } from "../../hooks/useCountUp";

export default function StatCounter({ stat, inView, index }) {
  const { label, value, suffix, icon: Icon } = stat;
  const count = useCountUp(value, inView, 1600 + index * 100);

  return (
    <div
      className="group relative bg-slate-900/60 border border-slate-700 rounded-xl p-6
                 flex flex-col items-center text-center gap-2
                 hover:border-amber-400/60 hover:-translate-y-1.5 transition-all duration-300
                 animate-fadeInUp"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Corner brackets */}
      <span className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400/0 group-hover:border-amber-400/70 transition-all duration-300" />
      <span className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/70 transition-all duration-300" />

      <Icon size={26} className="text-amber-400 mb-1" />

      <p className="text-3xl md:text-4xl font-bold font-mono text-slate-100 tabular-nums">
        {count.toLocaleString()}
        <span className="text-amber-400">{suffix}</span>
      </p>

      <p className="text-xs uppercase tracking-widest text-slate-500 font-mono">
        {label}
      </p>
    </div>
  );
}