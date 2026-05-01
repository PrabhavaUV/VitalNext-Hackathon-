export default function RiskBadge({ level, reason }) {
  const colors = {
    normal:   "bg-green-900 text-green-300 border border-green-700",
    warning:  "bg-yellow-900 text-yellow-300 border border-yellow-700",
    critical: "bg-red-900 text-red-300 border border-red-700 animate-pulse",
  };

  return (
    <div className={`rounded-xl p-4 ${colors[level] ?? colors.normal}`}>
      <p className="text-lg font-bold capitalize">{level ?? "normal"}</p>
      <p className="text-sm mt-1">{reason ?? "All vitals normal"}</p>
    </div>
  );
}
