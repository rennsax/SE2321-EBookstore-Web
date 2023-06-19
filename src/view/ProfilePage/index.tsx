import api from "service/api.json";
import useUserInfo from "utils/useUserInfo";
import InfoCard from "./InfoCard";
import ProfileCard from "./ProfileCard";

import "css/ProfilePage.css";
import { useEffect, useState } from "react";
import { changeInfo } from "service/UserServer";

export default function ProfilePage() {
  const { id: userId, avatarId, name, refetch } = useUserInfo();
  const avatar = `${api["avatar"]}/${avatarId}.jpg`;

  const [bufferName, setBufferName] = useState(name);

  const infoCardProps = {
    name: bufferName,
    setName: setBufferName,
  };

  // TODO: update other states
  useEffect(() => {
    if (bufferName !== name) {
      changeInfo(userId, bufferName).then(refetch);
    }
  });

  return (
    <div className="profile-page">
      <div className="profile-page__left">
        <ProfileCard avatar={avatar} name={bufferName} />
      </div>
      <div className="profile-page__right">
        <InfoCard {...infoCardProps} />
      </div>
    </div>
  );
}
