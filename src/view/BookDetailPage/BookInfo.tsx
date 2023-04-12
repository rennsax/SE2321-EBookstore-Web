import React, { useRef } from "react";
import { FlagFill, Cart4 } from "assets/icons";

type BookInfoProps = BookContent & BooksInCartState;

export default function BookInfo({
  abb,
  title,
  date,
  authors,
  price,
  isbn,
  intro,
  booksInCart,
  setBooksInCart,
}: BookInfoProps) {
  const iconRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);

  const handleClick = (e: React.SyntheticEvent | Event): void => {
    e.preventDefault();

    const iconClass = iconRef?.current?.classList as DOMTokenList;
    // If added before, return
    if (
      iconClass.length >= 2 ||
      (e.target as HTMLElement).classList.contains("book-details__btn--disable")
    ) {
      return;
    }
    (e.target as HTMLElement).classList.add("book-details__btn--disable");

    if (textRef.current) textRef.current.style.opacity = "0";
    iconClass.add("book-details__btn__cart--middle");
    new Promise<void>((resolve) => {
      setTimeout(() => {
        iconClass.remove("book-details__btn__cart--middle");
        iconClass.add("book-details__btn__cart--end");
        resolve();
      }, 1000);
    })
      .then(() => {
        const textElement = textRef.current as HTMLElement;
        textElement.classList.add("book-details__btn__text--added");
        textElement.innerText = "Added!";
        textElement.style.opacity = "100";
      })
      .then(() => {
        setBooksInCart((previous) => {
          // TODO enable add books multiple time
          return [...previous, { bookID: abb, count: 1 }];
        });
      });
  };

  const bought: boolean =
    booksInCart.filter((book) => book.bookID === abb).length !== 0;

  return (
    <div className="book-details">
      <div>
        <h2 className="book-details__title">{title}</h2>
        <h4 className="book-details__author">
          <span>by</span> <span id="book-author">{authors.join(", ")}</span>
        </h4>
        <p className="book-details__date">Released on {date}</p>
        <p className="book-details__isbn">ISBN: {isbn}</p>
        <p className="book-details__intro">
          <FlagFill />
          {intro}
        </p>
      </div>
      <div className="flex-space-between">
        <button className="book-details__btn" type="button">
          <span>{`$${price}`}</span>
          <span>Buy Now</span>
        </button>
        <div style={{ width: "16px" }}></div>
        <button
          className={
            "book-details__btn" + (bought ? " book-details__btn--disable" : "")
          }
          onClick={handleClick}
          type="button"
        >
          {/* <span></span> */}
          <span
            className={
              "book-details__btn__cart" +
              (bought ? " book-details__btn__cart--end" : "")
            }
            ref={iconRef}
          >
            <Cart4 />
          </span>
          <span
            ref={textRef}
            className={
              "book-details__btn__text" +
              (bought ? " book-details__btn__text--added" : "")
            }
          >
            {!bought ? "Add to cart" : "Added!"}
          </span>
        </button>
      </div>
    </div>
  );
}
