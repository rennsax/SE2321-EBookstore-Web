import { Cart4, FlagFill } from "assets/icons";
import React, { useRef } from "react";
import { updateOrderItem } from "service/OrderService";
import timer from "utils/timer";
import useUserInfo from "utils/useUserInfo";

type BookInfoProps = Book;

export default function BookInfo({
  uuid,
  title,
  date,
  author,
  price,
  isbn,
  intro,
}: BookInfoProps) {
  const bnt2Ref = useRef<HTMLButtonElement>(null);
  const {orderId} = useUserInfo();

  const buyBookByUuid = async (uuid: string): Promise<boolean> => {
    if (orderId === undefined) {
      return false;
    }
    await updateOrderItem(orderId, uuid, 1);
    return true;
  };

  const handleClick = async (e: React.SyntheticEvent | Event) => {
    e.preventDefault();

    const btn = bnt2Ref.current as HTMLButtonElement;
    const iconElement = btn.children[0] as HTMLElement;
    const textElement = btn.children[1] as HTMLElement;

    const iconClass = iconElement.classList;
    // If added before, return
    if (
      iconClass.length >= 2 ||
      btn.classList.contains("book-details__btn--disable")
    ) {
      console.log("don't click again!");
      return;
    }
    btn.classList.add("book-details__btn--disable");

    textElement.style.opacity = "0";
    iconClass.add("book-details__btn__cart--middle");
    await timer(1000);
    iconClass.remove("book-details__btn__cart--middle");
    iconClass.add("book-details__btn__cart--end");

    // TODO handle exception
    // eslint-disable-next-line
    const buyOk = await buyBookByUuid(uuid);

    textElement.classList.add("book-details__btn__text--added");
    const original_text = textElement.innerText;
    textElement.innerText = "Added!";
    textElement.style.opacity = "100";
    await timer(1000);
    textElement.style.opacity = "0";
    await timer(500);
    textElement.classList.remove("book-details__btn__text--added");
    iconClass.remove("book-details__btn__cart--end");
    textElement.innerText = original_text;
    textElement.style.opacity = "100";

    await timer(1000);
    btn.classList.remove("book-details__btn--disable");
  };

  return (
    <div className="book-details">
      <div>
        <h2 className="book-details__title">{title}</h2>
        <h4 className="book-details__author">
          <span>by</span> <span id="book-author">{author}</span>
        </h4>
        <p className="book-details__date">Released on {date}</p>
        <p className="book-details__isbn">ISBN: {isbn}</p>
        <p className="book-details__intro">
          <FlagFill />
          {intro}
        </p>
      </div>
      <div className="flex-space-between">
        <button className="book-details__btn" type="button" tabIndex={-1}>
          <span>{`$${price}`}</span>
          <span>Buy Now</span>
        </button>
        <div style={{ width: "16px" }}></div>
        <button
          className={"book-details__btn"}
          onClick={handleClick}
          type="button"
          tabIndex={-1}
          ref={bnt2Ref}
        >
          {/* <span></span> */}
          <span className={"book-details__btn__cart"}>
            <Cart4 />
          </span>
          <span className={"book-details__btn__text"}>{"Add to cart"}</span>
        </button>
      </div>
    </div>
  );
}
