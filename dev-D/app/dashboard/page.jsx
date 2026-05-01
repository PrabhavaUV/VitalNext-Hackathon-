// app/dashboard/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useVitals } from "@/hooks/useVitals";
import VitalsChart from "@/components/VitalsChart";
import HealthScore from "@/components/HealthScore";
import RiskBadge from "@/components/RiskBadge";
import PatientPanel from "@/components/PatientPanel";
import AlertFeed from "@/components/AlertFeed";
import { startSimulator } from "@/lib/startSimulator";

// Demo patient — hardcoded for hackathon demo
const PATIENT_ID = "demo-patient-1";
const DEMO_PATIENT = { name: "Arjun Mehta", age: 62, ward: "ICU - Ward 3" };

// Debug helper: forceCritical() in browser console triggers critical vitals
if (typeof window !== "undefined") {
  window.forceCritical = async () => {
    await fetch("/api/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: PATIENT_ID,
        hr: 135,
        spo2: 89,
        activity: 10,
        riskLevel: "critical",
        reason: "Heart rate dangerously high: 135 bpm",
        healthScore: 18,
      }),
    });
    console.log("⚠️ forceCritical() fired — check dashboard!");
  };
}

export default function Dashboard() {
  const vitals = useVitals(PATIENT_ID);
  const latest = vitals[vitals.length - 1];
  const [summary, setSummary] = useState(null);
  const [simulatorStarted, setSimulatorStarted] = useState(false);

  // Start simulator once on mount
  useEffect(() => {
    if (!simulatorStarted) {
      startSimulator(PATIENT_ID);
      setSimulatorStarted(true);
    }
  }, [simulatorStarted]);

  // Fetch AI summary on critical events (Dev D integration)
  useEffect(() => {
    if (latest?.riskLevel === "critical") {
      fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(latest),
      })
        .then(r => r.json())
        .then(setSummary);
    } else {
      setSummary(null);
    }
  }, [latest?.riskLevel]);

  const bgColor =
    latest?.riskLevel === "critical" ? "bg-red-950" :
    latest?.riskLevel === "warning"  ? "bg-yellow-950" : "bg-gray-950";

  return (
    <div className={`min-h-screen p-6 transition-colors duration-700 ${bgColor}`}>
      <h1 className="text-white text-2xl font-bold mb-6">VitalNest — Live Monitor</h1>

      {/* Top row: vitals cards + patient info */}
      <div className="grid grid-cols-4 gap-4 mb-6">
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
        {/* Patient panel */}
        <PatientPanel patient={DEMO_PATIENT} />
      </div>

      {/* Risk badge */}
      <RiskBadge level={latest?.riskLevel} reason={latest?.reason} />

      {/* Vitals chart */}
      <VitalsChart data={vitals} />

      {/* AI Clinical Summary — shown only on critical (Dev D) */}
      {summary && (
        <div className="bg-gray-900 border border-red-700 rounded-xl p-4 mt-4">
          <h3 className="text-red-400 font-bold mb-2">AI Clinical Summary</h3>
          <p className="text-white">{summary.summary}</p>
          <ul className="mt-2 text-gray-300 text-sm list-disc list-inside">
            {summary.observations.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
          <p className="mt-2 text-yellow-300 text-sm font-medium">{summary.advice}</p>
        </div>
      )}

      {/* Alert feed */}
      <AlertFeed alerts={[]} />
    </div>
  );
}
