export default function AlertFeed({ alerts }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 mt-4 max-h-48 overflow-y-auto">
      <h2 className="text-gray-400 text-sm mb-3">Alert Feed</h2>
      {alerts.length === 0 && (
        <p className="text-gray-600 text-sm">No alerts yet.</p>
      )}
      {alerts.map((alert, i) => (
        <div key={i} className="border-b border-gray-800 py-2">
          <span className={`text-xs font-bold uppercase mr-2 ${
            alert.riskLevel === "critical" ? "text-red-400" :
            alert.riskLevel === "warning"  ? "text-yellow-400" : "text-green-400"
          }`}>{alert.riskLevel}</span>
          <span className="text-gray-300 text-sm">{alert.message}</span>
          <p className="text-gray-600 text-xs mt-1">
            {alert.timestamp?.toDate?.().toLocaleTimeString() ?? ""}
          </p>
        </div>
      ))}
    </div>
  );
}
