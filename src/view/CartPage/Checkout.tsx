import React, { memo } from "react";
import { RightArrow } from "assets/icons";
import { cardTypes } from "assets/card-type";

interface CardTypeProps {
  typePic: string;
  typeName: string;
}

const CardType = memo(function CardType({ typePic, typeName }: CardTypeProps) {
  return (
    <li className="card-type__list__item">
      <label>
        <input type="radio" name="card_type" value={typeName} />
        <img src={typePic} alt={typeName} />
      </label>
    </li>
  );
});

const CardTypeList = memo(function CardTypeList() {
  const createList = () => {
    const res = [];
    for (let i = 0; i < 4; ++i)
      res.push(
        <CardType
          key={String(i)}
          typeName={cardTypes[i][0]}
          typePic={cardTypes[i][1]}
        />
      );
    return res;
  };

  return (
    <div className="card-type">
      <div className="card-type__header">Card type</div>
      <ul className="card-type__list">{createList()}</ul>
    </div>
  );
});

export default function Checkout({
  avatar,
  sumPrice,
}: {
  avatar: string;
  sumPrice: number;
}) {
  const shipPrice = 4;

  return (
    <form className="pay">
      <div className="pay__header flex-space-between">
        <div className="pay__header__title">
          <h3>Card details</h3>
        </div>
        <div className="pay__header__avatar display-circle">
          <img src={avatar} alt="user-avatar" />
        </div>
      </div>
      <CardTypeList />
      <div className="pay__info">
        <label>
          <div>Name on card</div>
          <input
            className="pay__info__input"
            placeholder="Name"
            autoComplete="true"
            type="text"
            name="pay_name"
          />
        </label>
      </div>
      <div className="pay__info">
        <label>
          <div>Card number</div>
          <input
            className="pay__info__input"
            placeholder="0000 0000 0000 0000"
            autoComplete="true"
            type="text"
            name="pay_number"
          />
        </label>
      </div>
      <div className="pay__info flex-space-between">
        <label>
          <div>Date</div>
          <input
            className="pay__info__input"
            placeholder="2023/1/1"
            autoComplete="true"
            type="text"
            name="pay_date"
          />
        </label>
        <div style={{ width: "10px" }}></div>
        <label>
          <div>CVV</div>
          <input
            className="pay__info__input"
            placeholder="000000"
            autoComplete="true"
            type="text"
            name="pay_cvv"
          />
        </label>
      </div>
      <hr />
      <div className="pay__result flex-space-between">
        <div>Subtotal</div>
        <div>{`$${sumPrice}`}</div>
      </div>
      <div className="pay__result flex-space-between">
        <div>Shipping</div>
        <div>{`$${shipPrice}`}</div>
      </div>
      <div className="pay__result flex-space-between">
        <div>Total(Incl. taxes)</div>
        <div>{`$${sumPrice + shipPrice}`}</div>
      </div>

      <button className="pay__submit flex-space-between">
        <div>{`$${sumPrice}`}</div>
        <div className="flex-space-between">
          <div style={{ marginRight: "10px" }}>Checkout</div>
          <RightArrow />
        </div>
      </button>
    </form>
  );
}
