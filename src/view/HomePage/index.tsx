import "css/HomePage.css";

import { createContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import HeaderInfo from "components/HeaderInfo";
import SideBar from "components/SideBar";

import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "service/UserServer";

export const UserInfoContext = createContext<UserInfo | undefined>(undefined);

function HomePage({
  account,
}: {
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
}) {
  // handle: when switching routes, scroll to the top
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", account],
    queryFn: async () => {
      return await getUserInfo(account);
    },
  });

  const [showProfile, setShowProfile] = useState<boolean>(false);
  const headerInfoProps = {
    showProfile,
    setShowProfile,
  };

  return (
    <UserInfoContext.Provider value={userInfo}>
      <div
        className="home"
        onClick={() => {
          if (showProfile) setShowProfile(false);
        }}
      >
        <div className="header">
          <HeaderInfo {...headerInfoProps} />
        </div>
        <div className="main">
          <div className="main-container">
            <div className="main__left">
              <SideBar />
            </div>
            <div className="main__hr">
              <hr />
            </div>
            <div className="main__right">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </UserInfoContext.Provider>
  );
}

export default HomePage;
