import "../../css/ProfilePage.css"
import React, { Component } from 'react'
import ProfileCard from './ProfileCard'
import InfoCard from "./InfoCard"

export default class ProfilePage extends Component {
  render() {
    return (
      <div className='profile-page'>
        <div className="profile-page__left">
          <ProfileCard />
        </div>
        <div className="profile-page__right">
          <InfoCard />
        </div>
      </div>
    )
  }
}
