import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";

export function useVitals(patientId) {
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    if (!patientId) return;
    const q = query(
      collection(db, "vitals"),
      where("patientId", "==", patientId),
      orderBy("timestamp", "desc"),
      limit(60)  // last 60 seconds
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() })).reverse();
      setVitals(data);
    });
    return unsub;
  }, [patientId]);

  return vitals;
}
