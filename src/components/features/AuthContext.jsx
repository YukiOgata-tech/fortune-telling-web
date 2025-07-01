// AuthContext.jsx — Email/Password + Google, Apple, Game Center 対応
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  updateProfile, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider
} from "firebase/auth";

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
  const [loading, setLoading] = useState(true); // initializingからloadingに変更

  /* ――― ensure user profile doc exists ――― */
  const ensureProfileDoc = async (u) => {
    if (!u) return;
    const ref = doc(db, "users", u.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      // ソーシャルログインなどで初めてログインした場合のドキュメント作成
      await setDoc(ref, {
        email: u.email,
        displayName: u.displayName || "",
        provider: u.providerData[0]?.providerId || "password",
        createdAt: serverTimestamp(),
        emailVerified: u.emailVerified, // プロバイダの情報を正として保存
      });
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await ensureProfileDoc(u);
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          if (data.emailVerified !== u.emailVerified) {
            await setDoc(ref, { emailVerified: u.emailVerified }, { merge: true });
          }
        }
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  /* ---------- Email / Password ---------- */
  const register = async (email, password, profile = {}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    // 1. Authプロファイルに表示名を更新
    if (profile.displayName) {
      await updateProfile(user, { displayName: profile.displayName });
    }

    // 2. 確認メールを送信
    await sendEmailVerification(user);

    // 3. Firestoreにユーザー情報を保存（★★★ 修正点 ★★★）
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: profile.displayName || "",
      provider: "password",
      createdAt: serverTimestamp(),
      emailVerified: false, // ★★★ 新規登録時は必ずfalseに設定 ★★★
      wantsDailyDigest: true,
    });

    // 4. Welcomeメール送信 (Cloud Functions)
    try {
        const sendWelcome = httpsCallable(functions, 'sendWelcomeEmail');
        await sendWelcome({ email: user.email, displayName: profile.displayName });
    } catch (error) {
        console.error("Welcome email function call failed:", error);
    }
    
    return cred;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  /* ---------- Social login helpers ---------- */
  const loginWithGoogle = () => {
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  const loginWithApple = () => {
    return signInWithPopup(auth, new OAuthProvider("apple.com"));
  };

  /* ---------- Public value ---------- */
  const value = {
    user,
    loading, // initializingからloadingに変更
    register,
    login,
    logout,
    resetPassword,
    loginWithGoogle,
    loginWithApple,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
