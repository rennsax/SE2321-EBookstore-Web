import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "utils/useAuth";

const RequireAuthorized: React.FC<{
  children: React.ReactNode;
  fallBack?: string;
  super?: boolean;
}> = ({ children, fallBack = "/login", super: needSuper = false }) => {
  const { authed, isSuper } = useAuth();

  // TODO Ask back-end, show require logging in
  if (authed && (!needSuper || isSuper)) {
    return <>{children}</>;
  }
  return <Navigate to={fallBack} replace />;
};

export default RequireAuthorized;
