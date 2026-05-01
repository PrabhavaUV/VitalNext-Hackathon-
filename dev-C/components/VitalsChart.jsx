import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function VitalsChart({ data }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 mt-4">
      <h2 className="text-gray-400 text-sm mb-3">Last 60 seconds</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" hide />
          <YAxis domain={[40, 140]} />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "none", color: "#fff" }}
          />
          <Legend />
          <Line type="monotone" dataKey="hr"   stroke="#ef4444" dot={false} name="HR" />
          <Line type="monotone" dataKey="spo2" stroke="#3b82f6" dot={false} name="SpO₂" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
