import React, { Component } from 'react'
import Blank from './util';

export default class extends Component {
  render() {
    return (
      <div className="App-header" >
        <div className='pic-container'>
          <img src="https://static.miraheze.org/celestewiki/4/40/Journal.png" height="80px" />
        </div>
        <div style={{ "width": "200px" }}>
          <h2>Bookstore</h2>
        </div>
        <Blank horizon="600px"/>
        <div className='user-info'>
          <div style={{"width": "240px"}}>
            <h2>Hi, Cauchy!</h2>
          </div>
          <div className="pic-container" style={{ "width": "80px" }}>
            <img src="https://static.miraheze.org/celestewiki/c/c0/FarewellIcon.png" height="60px" />
          </div>
        </div>
      </div>
    )
  }
}
