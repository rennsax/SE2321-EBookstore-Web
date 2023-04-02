import React from 'react'
import HeaderInfo from 'components/HeaderInfo';
import { NestedList } from 'components/SideBar';

export default function MainPage() {
  return (
    <div className="main-page">
      <HeaderInfo />
      <NestedList />
    </div>
  )
}
