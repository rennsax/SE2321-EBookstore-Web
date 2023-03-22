import React, { Component } from 'react'
import Box from '@mui/material/Box';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FaceRetouchingNaturalIcon from
  "@mui/icons-material/FaceRetouchingNatural";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import { NavLink } from 'react-router-dom';

class SelectorButton extends Component {
  render() {
    return (
      <ListItemButton sx={{ justifyContent: "space-between", borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}>
        <ListItemIcon sx={{ minWidth: "unset", mr: "20px" }}>
          {this.props.children}
        </ListItemIcon>
        <ListItemText primary={this.props.text} sx={{ display: "flex" }} />
      </ListItemButton>
    );
  }
}

export default class ProfileBar extends Component {
  hideProfile = (e) => {
    let profile = document.getElementById('profile-bar');
    profile.classList.remove('profile-bar--display');
  };

  render() {
    return (
      <div className="profile-bar-constructor">
        <div className='profile-bar' id="profile-bar">
          <div className="profile-bar__title">
            <div>Welcome,</div>
            <div className='profile-bar__title__name'>Linus Torvalds</div>
          </div>
          <Box id="profile-bar__selectors" sx={{ width: "100%" }} onClick={this.hideProfile} >
            <NavLink className='to-page-profile' to='/profile'>
              <SelectorButton text='Edit Profile'>
                <FaceRetouchingNaturalIcon />
              </SelectorButton>
            </NavLink>
            <SelectorButton text='My Favorite'>
              <FavoriteIcon />
            </SelectorButton>
            <SelectorButton text='Edit Address'>
              <AlternateEmailIcon />
            </SelectorButton>
          </Box>
        </div>
      </div>
    )
  }
}
