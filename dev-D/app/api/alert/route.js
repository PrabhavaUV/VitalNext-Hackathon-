import twilio from "twilio";

const DOCTOR_PHONE = process.env.DOCTOR_PHONE;
const FROM_PHONE   = process.env.TWILIO_PHONE;

// MOCK_MODE: if Twilio creds are missing, log alert instead of crashing
const MOCK_MODE = !process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !FROM_PHONE || !DOCTOR_PHONE;

export async function POST(req) {
  const { patientId, riskLevel, reason, hr, spo2, healthScore } = await req.json();

  if (riskLevel !== "critical") return Response.json({ skipped: true });

  const message = `🚨 VITALNEST ALERT\nPatient: ${patientId}\nRisk: CRITICAL\nHR: ${hr} | SpO₂: ${spo2}%\nScore: ${healthScore}/100\nReason: ${reason}`;

  if (MOCK_MODE) {
    // Demo mode — print alert to server console, no real SMS sent
    console.log("\n========== VITALNEST ALERT (MOCK) ==========");
    console.log(message);
    console.log("=============================================\n");
    return Response.json({ sent: false, mock: true, message });
  }

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  // SMS
  await client.messages.create({
    body: message,
    from: FROM_PHONE,
    to: DOCTOR_PHONE,
  });

  // Phone call (TwiML — plays a voice message)
  await client.calls.create({
    twiml: `<Response><Say voice="alice">Critical alert. Patient ${patientId} requires immediate attention. Heart rate ${hr}. Oxygen saturation ${spo2} percent.</Say></Response>`,
    from: FROM_PHONE,
    to: DOCTOR_PHONE,
  });

  return Response.json({ sent: true });
}
