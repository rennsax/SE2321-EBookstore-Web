import { memo } from "react";
// UI
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// router
import { Link, useNavigate } from "react-router-dom";

import "css/SideBar.css";
import useAuth from "utils/useAuth";
import Box from "@mui/material/Box";

const SideBar = memo(function SideBar() {
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
        <Link className="to-page-book" to="books">
          <ListItemButton>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItemButton>
        </Link>

        <Link className="to-page-cart" to="cart">
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="My Cart" />
          </ListItemButton>
        </Link>

        <Link className="to-page-order" to="orders">
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItemButton>
        </Link>

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
});

export default SideBar;
