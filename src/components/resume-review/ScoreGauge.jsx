export default function ScoreGauge({ score }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 80 ? "#34d399" : score >= 60 ? "#f59e0b" : "#f87171";
  const label = score >= 80 ? "Strong" : score >= 60 ? "Needs Work" : "Weak";

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg width="176" height="176" className="-rotate-90">
        <circle cx="88" cy="88" r={radius} stroke="#1e293b" strokeWidth="12" fill="none" />
        <circle
          cx="88" cy="88" r={radius}
          stroke={color} strokeWidth="12" fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold font-mono text-slate-100">{score}</span>
        <span className="text-xs font-mono uppercase tracking-wider" style={{ color }}>{label}</span>
      </div>
    </div>
  );
}