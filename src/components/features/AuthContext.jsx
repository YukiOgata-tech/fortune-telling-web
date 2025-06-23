// AuthContext.jsx — Email/Password + Google, Apple, Game Center 完全対応
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification, updateProfile, signInWithPopup, GoogleAuthProvider, OAuthProvider  } from "firebase/auth";


import {
  doc,
  setDoc,
  getDoc,
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

  /* ――― ensure user profile doc exists ――― */
  const ensureProfileDoc = async (u) => {
    if (!u) return;
    const ref = doc(db, "users", u.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        email: u.email,
        displayName: u.displayName || "",
        provider: u.providerData[0]?.providerId || "password",
        createdAt: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await ensureProfileDoc(u);
      setInitializing(false);
    });
    return unsub;
  }, []);

  /* ---------- Email / Password ---------- */
  const register = async (email, password, profile = {}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (profile.displayName) await updateProfile(cred.user, { displayName: profile.displayName });
    await sendEmailVerification(cred.user).catch(console.warn);
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      displayName: profile.displayName || "",
      provider: "password",
      createdAt: serverTimestamp(),
    });
    /* オンボーディングメールなど省略 */
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  /* ---------- Social login helpers ---------- */
  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

  const loginWithApple = () => signInWithPopup(auth, new OAuthProvider("apple.com"));

  
  /* ---------- Public value ---------- */
  const value = {
    user,
    initializing,
    register,
    login,
    logout,
    resetPassword,
    loginWithGoogle,
    loginWithApple,
    
  };

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};
