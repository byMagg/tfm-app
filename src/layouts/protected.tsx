import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function ProtectedLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  return <Outlet />;
}
