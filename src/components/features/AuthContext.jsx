
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

// Centralised Firebase instances
import { auth, db, functions } from "@/lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
    return unsub;
  }, []);

  /* ---------- Helpers ---------- */
  const register = async (email, password, profile = {}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // displayName をAuthユーザー本体にセット
    if (profile.displayName) {
      await updateProfile(cred.user, { displayName: profile.displayName });
    }
    // Require email verification before certain actions
    await sendEmailVerification(cred.user).catch(console.warn);

    // Create profile doc under users/{uid}
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      ...profile,
      createdAt: serverTimestamp(),
    });

    // Cloud Function: send onboarding / daily-fortune prompt
    try {
      const sendWelcomeEmail = httpsCallable(functions, "sendWelcomeEmail");
      await sendWelcomeEmail({
        email,
        displayName: profile.displayName || "",
      });
    } catch (err) {
      console.warn("Welcome email failed:", err);
    }
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  /**
   * Persist a daily‑fortune or questionnaire result
   * @param {{ topTypes: string[], biasTotal: number }} result
   */
  const saveFortuneResult = async (result) => {
    if (!user) return;
    await addDoc(collection(db, "users", user.uid, "fortuneResults"), {
      ...result,
      createdAt: serverTimestamp(),
    });
  };

  const value = {
    user,
    initializing,
    register,
    login,
    logout,
    resetPassword,
    saveFortuneResult,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};
