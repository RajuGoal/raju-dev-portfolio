import { stats } from "../../data/statsData";
import { useInView } from "../../hooks/useInView";
import StatCounter from "./StatCounter";

export default function StatsSection() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-20 px-6 bg-slate-950 overflow-hidden"
    >
      {/* subtle blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative text-center mb-10">
        <p className="text-amber-400 font-mono text-sm tracking-widest mb-2">
          Fig. 11 — STATISTICS
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
          By The Numbers
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {stats.map((stat, i) => (
          <StatCounter key={stat.id} stat={stat} inView={inView} index={i} />
        ))}
      </div>
    </section>
  );
}