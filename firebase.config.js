import { initializeApp } from "firebase/app";
import {
  getFirestore,
  CACHE_SIZE_UNLIMITED,
  persistentLocalCache,
} from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

if (typeof window !== "undefined") {
  getAnalytics(app);
}

getFirestore(app, { localCache: persistentLocalCache(/*settings*/ {}) });

const firestoreDb = getFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

setPersistence(auth, browserLocalPersistence);

export { app, db, auth, firestoreDb, provider };
