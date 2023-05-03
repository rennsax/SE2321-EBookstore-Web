import React from 'react'
import { Navigate } from "react-router-dom";
import useAuth from "utils/useAuth";

const RequireAuthorized: React.FC<{
  children: React.ReactNode;
  fallBack?: string;
}> = ({ children, fallBack }) => {
  const { authed } = useAuth();

  // TODO Ask back-end, show require logging in
  if (authed) {
    return <>{children}</>;
  }
  return <Navigate to={fallBack ?? "/login"} replace />;
};

export default RequireAuthorized;