import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function ProtectedLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
}
