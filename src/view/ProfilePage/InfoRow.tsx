export default function InfoRow({
  infoType,
  info,
}: {
  infoType: string;
  info: string;
}) {
  const inputBox = (
    <label>
      {infoType === "Bio" ? (
        <textarea
          cols={20}
          defaultValue={info}
          className="info-row__content"
          style={{ resize: "none", height: "100px" }}
          name={infoType}
        />
      ) : (
        <input
          type="text"
          defaultValue={info}
          className="info-row__content"
          name={infoType}
        />
      )}
    </label>
  );

  return (
    <div className="info-row">
      <p className="info-row__type">{infoType}</p>
      {/* <p className="info-row__content">
          {info}
        </p> */}
      {/* <input type="text" defaultValue={info} className="info-row__content" /> */}
      {inputBox}
    </div>
  );
}
