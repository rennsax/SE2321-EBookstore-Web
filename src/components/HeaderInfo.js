import React, { Component } from 'react';
import logo from "../assets/bookstore-logo.png";
import avatar from "../assets/test/Linus.png";
import ProfileBar from './ProfileBar';
import "../css/HeaderInfo.css";
import { NavLink } from 'react-router-dom';

export default class HeaderInfo extends Component {
  showProfile = () => {
    let profile = document.getElementById('profile-bar');
    const classes = profile.classList;
    if (classes.contains('profile-bar--display'))
      classes.remove('profile-bar--display');
    else
      classes.add('profile-bar--display');
  };

  render() {
    return (
      <div className="header-container flex-space-between" >
        <div className="header-container__title flex-space-between">
          <NavLink to="/books">
            <img className="header-container__title__logo" src={logo} alt='bookstore-logo' />
          </NavLink>
          <h1 className='header-container__title__text'>Bookstore</h1>
        </div>

        <div className='header-container__user flex-space-between'>
          {/* <h2 className='header-container__user__welcome'>Hi, Cauchy!</h2> */}
          <img className='header-container__user__avatar display-circle'
            onClick={this.showProfile}
            src={avatar}
            alt='user-avatar'
            id='active-profile'
          />
          <ProfileBar />
        </div>
      </div>
    )
  }
}
