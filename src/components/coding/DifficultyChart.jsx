import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { Easy: "#34d399", Medium: "#facc15", Hard: "#f87171", School: "#60a5fa", Basic: "#38bdf8" };

export default function DifficultyChart({ breakdown }) {
  if (!breakdown) return null;
  const data = Object.entries(breakdown).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height={140}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={35} outerRadius={55} paddingAngle={3}>
          {data.map((d) => (
            <Cell key={d.name} fill={COLORS[d.name] || "#94a3b8"} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}