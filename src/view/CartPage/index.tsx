import "css/CartPage.css";
import React, { useContext } from "react";

import BackToBookPage from "components/BackToBookPage";
import BookBuy, { BookBuyProps } from "./BookBuy";
import CartHeader from "./CartHeader";
import Checkout from "./Checkout";
import { BookInfoListContext } from "view/HomePage";

// TODO the avatar should not be saved in test directory
import avatar from "assets/test/Linus.png";

export default function CartPage({
  booksInCart,
  setBooksInCart,
}: BooksInCartState) {
  const bookContentList = useContext(BookInfoListContext);

  let bookCountSum = 0;
  let sumPrice = 0;
  booksInCart.forEach((books) => {
    bookCountSum += books.count;
  });

  const BookBuyList: JSX.Element[] = [];

  booksInCart.forEach((bookInCart) => {
    let res: BookContent | undefined;
    for (const bookContent of bookContentList) {
      if (bookContent.uuid === bookInCart.bookId) {
        res = bookContent;
        break;
      }
    }
    const neededInfo: BookBuyProps = {
      bookId: bookInCart.bookId,
      count: bookInCart.count,
      picId: res?.picId,
      title: res?.title,
      author: res?.author,
      price: res?.price,
      booksInCart: booksInCart,
      setBooksInCart: setBooksInCart,
    };
    BookBuyList.push(<BookBuy key={bookInCart.bookId} {...neededInfo} />);
    sumPrice += res?.price ?? 0;
  });

  return (
    <div className="cart-page">
      <div className="cart-page__left">
        <BackToBookPage />
        <hr />
        <CartHeader number={bookCountSum} />
        {/* TODO with back end */}
        {BookBuyList}
      </div>
      <div className="cart-page__right">
        <Checkout avatar={avatar} sumPrice={sumPrice} />
      </div>
    </div>
  );
}
