import React, { Component } from 'react';
import "../css/header_info.css";
import logo from "../assets/bookstore-logo.png";
import avatar from "../assets/user-avatar.png";

export default class HeaderInfo extends Component {
  render() {
    return (
      <div className="header clearfix" >
        <div className="header__title clearfix">
          <img className="header__title__logo" src={logo} alt='bookstore-logo' />
          <h1 className='header__title__text'>Bookstore</h1>
        </div>

        <div className='header__user'>
          <h2 className='header__user__welcome'>Hi, Cauchy!</h2>
          <img className='header__user__avatar' src={avatar} alt='user-avatar' />
        </div>
      </div>
    )
  }
}
