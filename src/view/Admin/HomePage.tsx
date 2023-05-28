import "css/HomePage.css";
import "css/Admin.css"
import { genericHeaderInfo } from "components/HeaderInfo";
import { useState } from "react";
import SideBar from "components/SideBar";
import { Outlet } from "react-router-dom";
import adminSideBars from "./SideBarConfig";

export default function AdminHomePage() {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const headerInfoProps = {
    showProfile,
    setShowProfile,
  };
  const HeaderInfo = genericHeaderInfo(true);

  return (
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
            <SideBar barInfoList={adminSideBars} />
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
  );
}
