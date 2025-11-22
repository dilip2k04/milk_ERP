// charts/OrdersChart.jsx
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";

export default function OrdersChart({ data }) {
  // data format:
  // [{ date: "2025-01-01", approved: 10, pending: 2, cancelled: 1 }, ...]

  return (
    <div className="w-full h-72 bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2">Orders Overview</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="approved" stroke="#16a34a" strokeWidth={2} />
          <Line type="monotone" dataKey="pending" stroke="#facc15" strokeWidth={2} />
          <Line type="monotone" dataKey="cancelled" stroke="#dc2626" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
