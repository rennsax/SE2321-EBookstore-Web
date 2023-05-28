import { useNavigate } from "react-router-dom";

import logo from "assets/bookstore-logo.png";
import "css/HeaderInfo.css";
import ProfileBar from "./ProfileBar";
import useUserInfo from "utils/useUserInfo";
import api from "service/api.json";

type HeaderInfoProps = {
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

export const genericHeaderInfo: (
  isSuper: boolean
) => React.FC<HeaderInfoProps> = (isSuper) => {
  if (isSuper) {
    const HeaderInfo: React.FC = function () {
      const navigate = useNavigate();
      return (
        <div className="header-container flex-space-between">
          <div className="header-container__title flex-space-between">
            <img
              onClick={() => navigate("/admin")}
              className="header-container__title__logo"
              src={logo}
              alt="bookstore-logo"
            />
            <h1 className="header-container__title__text">Bookstore</h1>
          </div>

          <div className="header-container__user flex-space-between"></div>
        </div>
      );
    };
    return HeaderInfo;
  }
  return HeaderInfo;
};

export default function HeaderInfo({
  showProfile,
  setShowProfile,
}: HeaderInfoProps) {
  const navigate = useNavigate();
  const { avatarId } = useUserInfo();
  const avatar = `${api["user.avatar"]}/${avatarId}.jpg`;

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
        {showProfile ? <ProfileBar setShowProfile={setShowProfile} /> : null}
      </div>
    </div>
  );
}
