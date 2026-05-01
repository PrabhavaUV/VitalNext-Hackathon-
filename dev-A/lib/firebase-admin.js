import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountStr) {
    try {
      const serviceAccount = JSON.parse(serviceAccountStr);
      initializeApp({
        credential: cert(serviceAccount)
      });
    } catch (error) {
      console.error("Firebase admin initialization error", error);
    }
  } else {
    try {
      initializeApp();
    } catch (e) {
      console.error("Firebase admin initialization without credentials error", e);
    }
  }
}

export const db = getFirestore();
