import React, { createContext } from "react";
import { Navigate } from "react-router-dom";

type AuthInfo = {
  authed: boolean;
  account: string;
};

type AuthContextType = [
  AuthInfo,
  React.Dispatch<React.SetStateAction<AuthInfo>>
];

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/** An authorized context, record current user account */
export default function useAuth() {
  const authContent = React.useContext(AuthContext);
  if (authContent === undefined) {
    throw "no authorized context is provided!";
  }
  const [authInfo, setAuthInfo] = authContent;

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

export const RequireAuthorized: React.FC<{ children: React.ReactNode; fallBack?: string; }> = ({
  children, fallBack
}) => {
  const { authed } = useAuth();
  return authed ? <>{children}</> : <Navigate to={fallBack ?? "/login"} replace />;
};
