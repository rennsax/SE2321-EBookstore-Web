import React from 'react'
import ProfileCard from './ProfileCard'
import InfoCard from "./InfoCard"

import "css/ProfilePage.css"

export default function ProfilePage() {
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
