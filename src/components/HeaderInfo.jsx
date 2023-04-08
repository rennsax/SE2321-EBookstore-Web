import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileBar from './ProfileBar';
import logo from "assets/bookstore-logo.png";
import avatar from "assets/test/Linus.png";
import "css/HeaderInfo.css";

export default function HeaderInfo() {
  const showProfile = () => {
    let profile = document.getElementById('profile-bar');
    const classes = profile.classList;
    if (classes.contains('profile-bar--display'))
      classes.remove('profile-bar--display');
    else
      classes.add('profile-bar--display');
  };

  const navigate = useNavigate();

  return (
    <div className="header-container flex-space-between" >
      <div className="header-container__title flex-space-between">
        <img
          onClick={() => navigate("/home")}
          className="header-container__title__logo"
          src={logo} alt='bookstore-logo'
        />
        <h1 className='header-container__title__text'>Bookstore</h1>
      </div>

      <div className='header-container__user flex-space-between'>
        <img className='header-container__user__avatar display-circle'
          onClick={showProfile}
          src={avatar}
          alt='user-avatar'
          id='active-profile'
        />
        <ProfileBar />
      </div>
    </div>
  )
}
