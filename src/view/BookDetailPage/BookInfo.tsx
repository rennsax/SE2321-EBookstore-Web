import React, { useRef } from "react";
import { FlagFill, Cart4 } from "assets/icons";
import timer from "utils/timer";
import myFetch, { FetchProps } from "utils/ajax";
import config from "config/front.json";

type BookInfoProps = Book & BooksInCartState;

export default function BookInfo({
  uuid,
  title,
  date,
  author,
  price,
  isbn,
  intro,
}: // booksInCart,
// setBooksInCart,
BookInfoProps) {
  const bnt2Ref = useRef<HTMLButtonElement>(null);

  const buyBookByUuid = async (uuid: string) => {
    const buyProp: FetchProps = {
      method: "GET",
      url: `${config["url.book.cart.control"]}/${uuid}`,
    };
    const res = await myFetch(buyProp).then((res) => {
      return res.json();
    });
    return res;
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

    const res: SuccessInfo = await buyBookByUuid(uuid);
    console.log(res.flag);

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
