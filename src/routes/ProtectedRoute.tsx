// routes/ProtectedRoute.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      navigate("/login");
    } else if (user && ["admin"].includes(user.role)) {
      navigate("/admin");
    }
  }, [user, location.pathname]);

  return <>{children}</>;
};

export default ProtectedRoute;
