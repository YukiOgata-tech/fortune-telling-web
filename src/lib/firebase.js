import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "ID"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, "us-central1");
const auth      = getAuth(app);
const db        = getFirestore(app);

export { app, auth, db, functions };
