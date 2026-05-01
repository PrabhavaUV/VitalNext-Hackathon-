import { db } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const body = await req.json();
    await db.collection("vitals").add({ ...body, timestamp: new Date() });
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
