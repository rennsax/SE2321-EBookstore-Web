import api from "service/api.json";
import useUserInfo from "utils/useUserInfo";
import InfoCard from "./InfoCard";
import ProfileCard from "./ProfileCard";

import "css/ProfilePage.css";

export default function ProfilePage() {
  const { avatarId, name } = useUserInfo();
  const avatar = `${api["avatar"]}/${avatarId}.jpg`;

  return (
    <div className="profile-page">
      <div className="profile-page__left">
        <ProfileCard avatar={avatar} name={name} />
      </div>
      <div className="profile-page__right">
        <InfoCard name={name} />
      </div>
    </div>
  );
}
