import React from "react";
// UI
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// router
import { Link, useNavigate } from "react-router-dom";

import "css/SideBar.css";
import useAuth from "utils/useAuth";

export interface NavigateBar {
  className?: string;
  to: string;
  primary: string;
  children?: React.ReactNode;
}

interface SideBarProps {
  barInfoList: NavigateBar[];
}

const SideBar: React.FC<SideBarProps> = function SideBar({ barInfoList }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {barInfoList.map((barInfo, index) => {
          const { className, to, primary, children } = barInfo;
          return (
            <Link className={className} to={to} key={`sidebar${index}`}>
              <ListItemButton>
                <ListItemIcon>{children}</ListItemIcon>
                <ListItemText primary={primary} />
              </ListItemButton>
            </Link>
          );
        })}

        <Box className="to-page-login">
          <ListItemButton
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </List>
    </div>
  );
};

export default SideBar;
