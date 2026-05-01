export default function HealthScore({ score }) {
  const color =
    score >= 75 ? "#22c55e" :
    score >= 50 ? "#eab308" : "#ef4444";

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col items-center justify-center">
      <p className="text-gray-400 text-sm mb-2">Health Score</p>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#374151" strokeWidth="10" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
          {score}
        </text>
      </svg>
    </div>
  );
}
