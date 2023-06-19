import React, { useState } from "react";
import useAppContext from "utils/useAppContext";

type InfoType = "Bio" | "Full Name" | "Email";

interface InfoRowProps {
  infoType: InfoType;
  info: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InfoRow: React.FC<InfoRowProps> = ({ infoType, info, onChange }) => {
  const inputBox = (
    <label>
      {((
        infoType: InfoType,
        info: string,
        onChange?: React.ChangeEventHandler<HTMLInputElement>
      ): React.ReactNode => {
        switch (infoType) {
          case "Bio":
            return (
              <textarea
                cols={20}
                defaultValue={info}
                className="info-row__content"
                style={{ resize: "none", height: "100px" }}
                name={infoType}
              />
            );
          case "Full Name":
            return (
              <input
                type="text"
                value={info}
                className="info-row__content"
                name={infoType}
                onChange={onChange} // Not null
              />
            );
          case "Email":
            return (
              <input
                type="text"
                value={info}
                className="info-row__content"
                name={infoType}
                readOnly
              />
            );
        }
      })(infoType, info, onChange)}
    </label>
  );

  return (
    <div className="info-row">
      <p className="info-row__type">{infoType}</p>
      {inputBox}
    </div>
  );
};

interface InfoCardProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const InfoCard: React.FC<InfoCardProps> = ({ name, setName }) => {
  const [
    {
      authInfo: { account },
    },
  ] = useAppContext();

  const [bufferName, setBufferName] = useState<string>(name);

  const infoList: Array<{
    infoType: InfoType;
    info: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
  }> = [
    {
      infoType: "Full Name",
      info: bufferName,
      onChange: (e) => {
        setBufferName(e.target.value);
      },
    },
    { infoType: "Email", info: account },
    // { infoType: "Phone", info: "(097) 234-7890" },
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

  const handleSave = (e: ButtonEvent): void => {
    e.preventDefault();
    if (name !== bufferName) {
      setName(bufferName);
    }
  };

  const handleReset = (e: ButtonEvent): void => {
    e.preventDefault();
    setBufferName(name);
  };

  return (
    <form className="info-card" action="#">
      <div className="info-card__row">{infoRows}</div>
      <div className="info-card__btn">
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default InfoCard;
