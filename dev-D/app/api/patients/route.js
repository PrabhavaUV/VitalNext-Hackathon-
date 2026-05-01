import { db } from "@/lib/firebase-admin"; // server-side admin SDK

export async function POST(req) {
  const { name, age, ward } = await req.json();
  const ref = await db.collection("patients").add({
    name, age, ward, createdAt: new Date()
  });
  return Response.json({ id: ref.id });
}
