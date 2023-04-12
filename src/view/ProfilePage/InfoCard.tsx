import React from "react";
import InfoRow from "./InfoRow";

export default function InfoCard() {
  const infoList = [
    { infoType: "Full Name", info: "Linus Torvalds" },
    { infoType: "Email", info: "123@gmail.com" },
    { infoType: "Phone", info: "(097) 234-7890" },
    { infoType: "Bio", info: "Hi, I'm the creator of Linux." },
  ];
  const infoRows = (() => {
    const infoEle: JSX.Element[] = [];
    infoList.forEach((info_e) => {
      // console.log({...info_e});
      infoEle.push(<InfoRow {...info_e} key={info_e["infoType"]} />);
      infoEle.push(<hr key={info_e["infoType"] + "_hr"} />);
    });
    infoEle.pop(); // remove the final <hr />
    return infoEle;
  })();

  return (
    <form className="info-card" action="#">
      <div className="info-card__row">{infoRows}</div>
      <div className="info-card__btn">
        <button type="button">Save</button>
        <button type="button">Reset</button>
      </div>
    </form>
  );
}
