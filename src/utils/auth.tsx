import React from "react";
import { Navigate } from "react-router-dom";
import useAppContext from "./appContext";

/** An authorized context, record current user account */
export default function useAuth() {
  const { authInfo, setAuthInfo } = useAppContext();

  // TODO a question: why a callback take effects?
  return {
    ...authInfo,
    login(account: string) {
      // return new Promise<void>((resolve) => {
      setAuthInfo((pre) => {
        pre.authed = true;
        pre.account = account;
        return pre;
      });
      //   resolve();
      // });
    },
    logout() {
      // return new Promise<void>((resolve) => {
      setAuthInfo((pre) => {
        pre.authed = false;
        pre.account = "";
        return pre;
      });
      //   resolve();
      // });
    },
  };
}

export const RequireAuthorized: React.FC<{
  children: React.ReactNode;
  fallBack?: string;
}> = ({ children, fallBack }) => {
  const { authed } = useAuth();
  const { setShowPleaseLogin } = useAppContext();

  if (authed) {
    return <>{children}</>;
  }
  setShowPleaseLogin(true);
  return <Navigate to={fallBack ?? "/login"} replace />;
};
