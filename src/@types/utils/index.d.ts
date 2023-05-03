type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface FetchProps {
  url: string;
  method: Method;
  headers?: HeadersInit;
  params?: object;
}

/** context */
type AuthInfo = {
  authed: boolean;
  account: string;
};

type AuthContextType = [
  AuthInfo,
  React.Dispatch<React.SetStateAction<AuthInfo>>
];

type SetState<T = boolean> = React.Dispatch<React.SetStateAction<T>>

type AppContextType = {
  authInfo: AuthInfo;
  setAuthInfo: SetState<AuthInfo>;
  showPleaseLogin: boolean;
  setShowPleaseLogin: SetState<boolean>;
}