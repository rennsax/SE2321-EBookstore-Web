import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";
import useUserInfo from "utils/useUserInfo";

function SelectorButton({
  children,
  text,
}: {
  children: JSX.Element;
  text: string;
}) {
  return (
    <ListItemButton
      sx={{
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
      }}
    >
      <ListItemIcon sx={{ minWidth: "unset", mr: "20px" }}>
        {children}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ display: "flex" }} />
    </ListItemButton>
  );
}

export default function ProfileBar({
  setShowProfile,
}: {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { name } = useUserInfo();

  return (
    <div className="profile-bar-constructor">
      <div
        className="profile-bar profile-bar--display"
        id="profile-bar"
        onClick={() => {
          setShowProfile(false);
        }}
      >
        <div className="profile-bar__title">
          <div>Welcome,</div>
          <div className="profile-bar__title__name">{name}</div>
        </div>
        <Box id="profile-bar__selectors" sx={{ width: "100%" }}>
          <Link className="to-page-profile" to="profile">
            <SelectorButton text="Edit Profile">
              <FaceRetouchingNaturalIcon />
            </SelectorButton>
          </Link>
          <SelectorButton text="My Favorite">
            <FavoriteIcon />
          </SelectorButton>
          <SelectorButton text="Edit Address">
            <AlternateEmailIcon />
          </SelectorButton>
        </Box>
      </div>
    </div>
  );
}
