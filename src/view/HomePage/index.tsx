import "css/HomePage.css";

import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import HeaderInfo from "components/HeaderInfo";
import SideBar from "components/SideBar";

import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "service/UserServer";
import useAuth from "utils/useAuth";
import { UserInfoContext } from "utils/useUserInfo";
import homePageBars from "./SideBarConfig";

function HomePage() {
  // handle: when switching routes, scroll to the top
  const { pathname } = useLocation();
  const { isSuper } = useAuth();
  const navigate = useNavigate();

  // TODO should administrator enter the common HomePage?
  useEffect(() => {
    if (isSuper) {
      navigate("/admin", { replace: true });
    }
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  /** Since home page is wrapped by `RequireAuthorized`, before entering, the user must login */
  const { account } = useAuth();

  const {
    data: userInfo,
    isSuccess,
    refetch: refetchUserInfo,
  } = useQuery({
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

  /** Still fetching user info... */
  if (!isSuccess) {
    return <CircularProgress />;
  }

  return (
    <UserInfoContext.Provider
      value={[
        userInfo,
        async () => {
          await refetchUserInfo();
        },
      ]}
    >
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
              <SideBar barInfoList={homePageBars} />
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
