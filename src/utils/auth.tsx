import React from "react";
import { Navigate } from "react-router-dom";

type AuthInfo = {
  authed: boolean;
  account: string;
};
/** An authorized context, record current user account */
export default function useAuth() {
  const [authInfo, setAuthInfo] = React.useState<AuthInfo>({
    authed: false,
    account: "",
  });

  return {
    ...authInfo,
    login: (account: string) => {
      setAuthInfo({ authed: true, account });
    },
    logout: () => {
      setAuthInfo(() => {
        return { authed: false, account: "" };
      });
    },
  };
}

export const NeedAuthorized: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authed } = useAuth();
  return authed ? <>{children}</> : <Navigate to="/login" replace />;
};
