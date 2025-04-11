import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthProvider";
const RequiredLogout: React.FC = () => {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user?.phone && !loading) {
      navigate("/");
    }
  }, [user?.phone, loading]);

  if (!user && !loading) {
    return <Outlet />;
  }

  return <div className="loading-page"></div>;
};

export default RequiredLogout;
