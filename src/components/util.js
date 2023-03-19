import React, { Component } from 'react'

export default class Blank extends Component {
  // static defaultProps = {
  //   horizon: "0",
  //   vertical: "0"
  // }
  render() {
    const {horizon, vertical} = this.props;
    return (
      <div className='blank' style={{"width": horizon, "height": vertical}}></div>
    )
  }
}
