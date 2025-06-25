// src/components/features/AdminGuard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Spinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-purple-400 mb-4"></div>
    <div className="text-xl text-gray-400">認証中...</div>
  </div>
);

const AdminGuard = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (!user) {
        alert("管理者としてログインしてください");
        navigate("/login/to/neo-oracle");
        return;
      }
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists() || !userDoc.data().admin) {
        alert("このページは管理者専用です");
        navigate("/");
        return;
      }
      setIsAllowed(true);
      setIsChecking(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (isChecking) {
    return <Spinner />;
  }  

  return isAllowed ? children : null;
};

export default AdminGuard;
