import { useNavigate } from "react-router-dom";

import logo from "assets/bookstore-logo.png";
import avatar from "assets/test/Linus.png";
import "css/HeaderInfo.css";
import ProfileBar from "./ProfileBar";

type HeaderInfoProps = {
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderInfo({showProfile, setShowProfile} : HeaderInfoProps) {
  const navigate = useNavigate();

  return (
    <div className="header-container flex-space-between">
      <div className="header-container__title flex-space-between">
        <img
          onClick={() => navigate("/home")}
          className="header-container__title__logo"
          src={logo}
          alt="bookstore-logo"
        />
        <h1 className="header-container__title__text">Bookstore</h1>
      </div>

      <div className="header-container__user flex-space-between">
        <img
          className="header-container__user__avatar display-circle"
          onClick={() => {
            setShowProfile((isShow) => !isShow);
          }}
          src={avatar}
          alt="user-avatar"
          id="active-profile"
        />
        {showProfile ? <ProfileBar setShowProfile={setShowProfile}/> : null}
      </div>
    </div>
  );
}
