import React, { Component } from 'react'

export default class InfoRow extends Component {
  render() {
    const { infoType, info } = this.props;
    return (
      <div className="info-row">
        <p className="info-row__type">
          {infoType}
        </p>
        <p className="info-row__content">
          {info}
        </p>
      </div>
    )
  }
}
