let hr = 75;      // heart rate starts normal
let spo2 = 98;    // oxygen saturation starts normal
let activity = 40;

export function generateVitals() {
  // Random walk — small drift each tick
  hr     = clamp(hr     + rand(-2, 2),   40, 140);
  spo2   = clamp(spo2   + rand(-0.5, 0.5), 85, 100);
  activity = clamp(activity + rand(-5, 5), 0, 100);

  // Inject anomaly ~5% of the time for demo drama
  if (Math.random() < 0.05) {
    hr = Math.random() < 0.5 ? rand(130, 145) : rand(35, 48);
  }
  if (Math.random() < 0.03) {
    spo2 = rand(86, 91);
  }

  return { hr: Math.round(hr), spo2: +spo2.toFixed(1), activity: Math.round(activity) };
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const rand  = (min, max) => Math.random() * (max - min) + min;

export function detectAnomaly({ hr, spo2 }) {
  if (spo2 < 92) {
    return { riskLevel: "critical", reason: `SpO₂ critically low at ${spo2}%` };
  }
  if (hr > 120) {
    return { riskLevel: "critical", reason: `Heart rate dangerously high: ${hr} bpm` };
  }
  if (hr < 50) {
    return { riskLevel: "critical", reason: `Heart rate dangerously low: ${hr} bpm` };
  }
  if (spo2 < 95 || hr > 100 || hr < 58) {
    return { riskLevel: "warning", reason: "Vitals slightly out of normal range" };
  }
  return { riskLevel: "normal", reason: "All vitals within normal range" };
}

export function calculateHealthScore({ hr, spo2, activity }) {
  // Normalize each metric 0–100
  const hrScore   = hr >= 60 && hr <= 100
    ? 100
    : hr < 60 ? Math.max(0, 100 - (60 - hr) * 4)
              : Math.max(0, 100 - (hr - 100) * 3);

  const spo2Score = spo2 >= 97 ? 100
    : spo2 >= 92 ? (spo2 - 92) * 14    // 92→97 maps to 0→70
    : 0;

  const actScore  = Math.min(100, activity);

  // Weighted average: HR 40%, SpO2 45%, Activity 15%
  const score = (hrScore * 0.4) + (spo2Score * 0.45) + (actScore * 0.15);
  return Math.round(score);
}
