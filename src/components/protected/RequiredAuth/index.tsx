// src/components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthProvider";

const RequiredAuth: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      if (!user?.phone && !loading) {
        navigate("/login");
      }
    })();
  }, [user?.phone, loading]);
  if (user?.phone && !loading) {
    return <Outlet />;
  }

  return <div className="loading-page"></div>;
};

export default RequiredAuth;
