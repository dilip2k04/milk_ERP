// charts/FinanceChart.jsx
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from "recharts";

export default function FinanceChart({ data }) {
  // data format:
  // [{ date: "2025-01-01", income: 5200, expenses: 2800 }, ...]

  return (
    <div className="w-full h-72 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2">Finance Overview</h3>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#2563eb"
            fill="#93c5fd"
            fillOpacity={0.5}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#dc2626"
            fill="#fca5a5"
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
