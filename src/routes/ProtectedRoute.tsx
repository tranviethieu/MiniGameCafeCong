// routes/ProtectedRoute.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user && ["admin"].includes(user.role)) {
      navigate("/admin");
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
