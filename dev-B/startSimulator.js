import { generateVitals, detectAnomaly, calculateHealthScore } from "./simulate.js";

export async function startSimulator(patientId) {
  setInterval(async () => {
    const raw = generateVitals();
    const { riskLevel, reason } = detectAnomaly(raw);
    const healthScore = calculateHealthScore(raw);

    const payload = { patientId, ...raw, riskLevel, reason, healthScore };

    try {
      // POST to your API route (Dev A's endpoint)
      await fetch("http://localhost:3000/api/vitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // If critical → trigger alert
      if (riskLevel === "critical") {
        await fetch("http://localhost:3000/api/alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId, ...payload }),
        });
      }
    } catch (error) {
      console.error("Simulation tick failed (API might not be up yet):", error.message);
    }
  }, 1000);
}

// Uncomment the line below to run the simulator directly with node (e.g., node lib/startSimulator.js)
// startSimulator("demo-patient-1");
