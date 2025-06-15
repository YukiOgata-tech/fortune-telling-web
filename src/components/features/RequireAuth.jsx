import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/features/AuthContext";

export default function RequireAuth({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return null;           // スピナー等でもOK
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
