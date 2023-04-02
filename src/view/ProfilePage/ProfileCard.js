import React from 'react'
import avatar from "assets/test/Linus.png"
import { EditPencil } from 'assets/icons'

export default function ProfileCard() {
  return (
    <div className='profile-card'>
      <div className="profile-card__avatar">
        <img
          src={avatar}
          alt="avatar"
          style={{ borderRadius: "50%" }}
        />
        <button className="profile-card__avatar__edit">
          <EditPencil />
          <span>Edit</span>
        </button>
      </div>
      <h4 className='profile-card__name'>
        Linus Torvalds
      </h4>
      <p className='profile-card__job'>
        Developer
      </p>
      <p className='profile-card__inst'>
        Linux Foundation
      </p>
    </div>
  )
}
