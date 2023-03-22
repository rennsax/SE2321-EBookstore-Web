import React, { Component } from 'react'
import InfoRow from './InfoRow'

export default class InfoCard extends Component {
  createInfo = () => {
    let infoList = [
      {infoType: "Full Name", info: "Linus Torvalds"},
      {infoType: "Email", info: "123@gmail.com"},
      {infoType: "Phone", info: "(097) 234-7890"}
    ];
    let infoEle = [];
    infoList.forEach((info_e) => {
      console.log({...info_e});
      infoEle.push(
        <InfoRow {...info_e} key={info_e['infoType']} />
      )
      infoEle.push(<hr key={info_e['infoType'] + "_hr"} />)
    });
    infoEle.pop(); // remove the final hr
    return infoEle;
  };


  render() {
    return (
      <div className="info-card">
        <div className="info-card__row">
          {this.createInfo()}
        </div>
      </div>
    )
  }
}
