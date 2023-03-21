import React, { Component } from 'react';
import logo from "../assets/bookstore-logo.png";
import avatar from "../assets/user-avatar.png";
import "../css/HeaderInfo.css";

export default class HeaderInfo extends Component {
  render() {
    return (
      <div className="header-container clearfix" >
        <div className="header-container__title">
          <img className="header-container__title__logo" src={logo} alt='bookstore-logo' />
          <h1 className='header-container__title__text'>Bookstore</h1>
        </div>

        <div className='header-container__user'>
          <h2 className='header-container__user__welcome'>Hi, Cauchy!</h2>
          <img className='header-container__user__avatar' src={avatar} alt='user-avatar' />
          <div className="header-container__user__clicked"></div>
        </div>
      </div>
    )
  }
}
