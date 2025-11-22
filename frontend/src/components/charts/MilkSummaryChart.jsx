// charts/MilkSummaryChart.jsx
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from "recharts";

export default function MilkSummaryChart({ data }) {
  // data format:
  // [{ date: "2025-01-01", liters: 120 }, ...]

  return (
    <div className="w-full h-72 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2">Milk Summary</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="liters" fill="#4f46e5" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
