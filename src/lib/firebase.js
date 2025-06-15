import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH3Uqnxf0_R1wM0uyxvoJvOiLfAowwBbU",
  authDomain: "neo-oracle-17f26.firebaseapp.com",
  projectId: "neo-oracle-17f26",
  storageBucket: "neo-oracle-17f26.firebasestorage.app",
  messagingSenderId: "223143268834",
  appId: "1:223143268834:web:1b8e8a77ec1a33c8a7a9bb"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, "us-central1");
const auth      = getAuth(app);
const db        = getFirestore(app);

export { app, auth, db, functions };
