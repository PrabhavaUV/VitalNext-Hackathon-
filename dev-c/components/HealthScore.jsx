export default function HealthScore({ score }) {
  const color = score >= 80 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";
  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col items-center justify-center">
      <p className="text-gray-400 text-sm mb-2">Health Score</p>
      <div className={`text-4xl font-bold ${color}`}>
        {score}
      </div>
      <p className="text-gray-500 text-xs mt-1">out of 100</p>
    </div>
  );
}
