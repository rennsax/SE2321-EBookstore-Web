import useAppContext from "./useAppContext";

/** Get authorized information from app context */
export default function useAuth() {
  const [{ authInfo }, dispatch] = useAppContext();

  return {
    ...authInfo,
    login(account: string) {
      dispatch({
        authInfo: (authInfo) => {
          authInfo.authed = true;
          authInfo.account = account;
          return authInfo;
        },
      });
    },
    logout() {
      dispatch({
        authInfo: (authInfo) => {
          authInfo.authed = false;
          authInfo.account = "";
          return authInfo;
        },
      });
    },
  };
}
