import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { hr, spo2, activity, riskLevel, healthScore, reason } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a clinical decision support assistant. A patient's vitals have been recorded.
Do NOT give a medical diagnosis. Provide a brief, clear summary for the attending nurse.

Vitals:
- Heart Rate: ${hr} bpm
- SpO₂: ${spo2}%
- Activity Level: ${activity}/100
- Health Score: ${healthScore}/100
- Risk Level: ${riskLevel}
- System reason: ${reason}

Respond in this JSON format only:
{
  "summary": "One sentence overview",
  "observations": ["Observation 1", "Observation 2"],
  "advice": "Simple action for the care team (not a diagnosis)"
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    return Response.json(JSON.parse(clean));
  } catch {
    return Response.json({ summary: text, observations: [], advice: "" });
  }
}
