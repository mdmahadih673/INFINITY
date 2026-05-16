import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPcdMiJyZlBmn4tK3nQD9Vns7u429KQOs",
  authDomain: "infinity-d24fb.firebaseapp.com",
  projectId: "infinity-d24fb",
  storageBucket: "infinity-d24fb.firebasestorage.app",
  messagingSenderId: "466725306755",
  appId: "1:466725306755:web:cf9d74b0ff75c2d318f6b6",
  measurementId: "G-6ZCSNN471W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
