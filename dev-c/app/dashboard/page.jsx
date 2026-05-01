"use client";
import { useVitals } from "@/hooks/useVitals";
import VitalsChart from "@/components/VitalsChart";
import HealthScore from "@/components/HealthScore";
import RiskBadge from "@/components/RiskBadge";

export default function Dashboard() {
  const patientId = "demo-patient-1"; // hardcode for demo
  const vitals = useVitals(patientId);
  const latest = vitals[vitals.length - 1];

  const bgColor =
    latest?.riskLevel === "critical" ? "bg-red-950" :
    latest?.riskLevel === "warning"  ? "bg-yellow-950" : "bg-gray-950";

  return (
    <div className={`min-h-screen p-6 transition-colors duration-700 ${bgColor}`}>
      <h1 className="text-white text-2xl font-bold mb-6">VitalNest — Live Monitor</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* HR card */}
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">Heart Rate</p>
          <p className="text-white text-4xl font-bold">{latest?.hr ?? "--"}</p>
          <p className="text-gray-500 text-xs">bpm</p>
        </div>
        {/* SpO2 card */}
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">SpO₂</p>
          <p className="text-white text-4xl font-bold">{latest?.spo2 ?? "--"}</p>
          <p className="text-gray-500 text-xs">%</p>
        </div>
        {/* Health score */}
        <HealthScore score={latest?.healthScore ?? 0} />
      </div>

      <RiskBadge level={latest?.riskLevel} reason={latest?.reason} />

      <VitalsChart data={vitals} />
    </div>
  );
}
