import { createContext, useContext } from "react";

type UserInfoContextType = [UserInfo, () => Promise<void>];

export const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined
);

export default function useUserInfo() {
  const userInfoContext = useContext(UserInfoContext);
  if (userInfoContext === undefined) {
    throw new Error("Unexpected error occurs!");
  }
  const [userInfo, refetch] = userInfoContext;
  return { ...userInfo, refetch };
}
