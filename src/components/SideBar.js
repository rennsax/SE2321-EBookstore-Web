import React from 'react'
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FaceRetouchingNaturalIcon from
  "@mui/icons-material/FaceRetouchingNatural";
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from "@mui/icons-material/Logout";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

import "../css/SideBar.css"
import { NavLink } from 'react-router-dom';

export function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='side-bar'>
      <List
        sx={{
          width: "100%", maxWidth: 360,
          bgcolor: "background.paper"
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <NavLink className='page-book' to='/books'>
          <ListItemButton>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Books" />
          </ListItemButton>
        </NavLink>

        <NavLink className='page-cart' to='/cart'>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="My Cart" />
          </ListItemButton>
        </NavLink>

        <NavLink className='page-order' to='/orders'>
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItemButton>
        </NavLink>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FaceRetouchingNaturalIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="My Favorite" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );
}
