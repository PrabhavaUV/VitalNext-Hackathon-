import { generateVitals, detectAnomaly, calculateHealthScore } from "./simulate.js";

export async function startSimulator(patientId) {
  setInterval(async () => {
    const raw = generateVitals();
    const { riskLevel, reason } = detectAnomaly(raw);
    const healthScore = calculateHealthScore(raw);

    const payload = { patientId, ...raw, riskLevel, reason, healthScore };

    // POST to your API route (Dev A's endpoint)
    await fetch("/api/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // If critical → trigger alert
    if (riskLevel === "critical") {
      await fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId, ...payload }),
      });
    }
  }, 1000);
}
