import React, { Component } from 'react'

export default class extends Component {
  render() {
    return (
      <div className="header" >
        <div className="header__logo">
          <img id='logo' src="https://static.miraheze.org/celestewiki/4/40/Journal.png" />
        </div>
        <div className="header__title">
          <h1>Bookstore</h1>
        </div>

        <div className='header__user'>
          <h2 className='header__user__welcome'>Hi, Cauchy!</h2>
            <img id='face' src="https://static.miraheze.org/celestewiki/c/c0/FarewellIcon.png" />
        </div>
      </div>
    )
  }
}
