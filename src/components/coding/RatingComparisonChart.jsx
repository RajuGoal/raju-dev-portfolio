import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export default function RatingComparisonChart({ profiles }) {
  const data = profiles
    .filter((p) => p.rating)
    .map((p) => ({ name: p.name, rating: p.rating, max: p.maxRating }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip
          contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
        />
        <Bar dataKey="rating" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        <Bar dataKey="max" fill="#334155" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}