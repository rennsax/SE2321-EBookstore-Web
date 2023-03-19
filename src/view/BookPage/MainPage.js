import React, { Component } from 'react'
import HeaderInfo from '../components/HeaderInfo';
import { NestedList } from '../components/SideBar';

export default class MainPage extends Component {
  render() {
    return (
    <div className="main-page">
      <HeaderInfo/>
      <NestedList/>
    </div>
    )
  }
}
