import useAppContext from "utils/useAppContext";
import InfoRow from "./InfoRow";

export default function InfoCard({ name }: { name: string }) {
  const [
    {
      authInfo: { account },
    },
  ] = useAppContext();

  const infoList = [
    { infoType: "Full Name", info: name },
    { infoType: "Email", info: account},
    { infoType: "Phone", info: "(097) 234-7890" },
    { infoType: "Bio", info: "" },
  ];
  const infoRows = (() => {
    const infoEle: JSX.Element[] = [];
    infoList.forEach((info_e) => {
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
