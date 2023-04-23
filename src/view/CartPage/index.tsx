import { QueryOptions, useQueries } from "@tanstack/react-query";
import "css/CartPage.css";

import BackToBookPage from "components/BackToBookPage";
import config from "config/front.json";
import CartHeader from "./CartHeader";
import Checkout from "./Checkout";

// TODO the avatar should not be saved in test directory
import avatar from "assets/test/Linus.png";
import myFetch from "utils/ajax";
import BookBuyCard from "./BookBuyCard";

export default function CartPage({
  booksInCart,
  setBooksInCart,
}: BooksInCartState) {
  let bookCountSum = 0;
  const queries: QueryOptions[] = [];

  booksInCart.forEach((book) => {
    bookCountSum += book.quantity;
    // set queries
    queries.push({
      queryKey: ["bookInCart", book.uuid],
      queryFn: async () => {
        const data = await myFetch({
          method: "GET",
          url: `${config["url.book.info"]}/${book.uuid}`,
        }).then((res) => {
          return res.json();
        });
        return data;
      },
      retry: config["ajax.retry.maxTimes"],
      retryDelay: config["ajax.retry.delay"],
    });
  });

  const results = useQueries<Book[]>({
    queries: queries,
  });

  const bookBuyElements: JSX.Element[] = [];
  // TODO use a more precise way
  let sumPrice = 0;
  let allIsSuccess = true;
  results.forEach((res, i) => {
    const { data, isSuccess } = res;
    if (isSuccess) {
      sumPrice += booksInCart[i].quantity * (data as Book).price;
      bookBuyElements.push(
        <BookBuyCard
          bookContent={data as Book}
          count={booksInCart[i].quantity}
          booksInCart={booksInCart}
          setBooksInCart={setBooksInCart}
          key={`bookCartCard${i}`}
        />
      );
    }
    allIsSuccess &&= isSuccess;
  });
  return (
    <div className="cart-page">
      <div className="cart-page__left">
        <BackToBookPage />
        <hr />
        <CartHeader number={bookCountSum} />
        {/* TODO with back end */}
        {allIsSuccess ? bookBuyElements : <></>}
      </div>
      <div className="cart-page__right">
        <Checkout
          avatar={avatar}
          sumPrice={sumPrice}
          setBooksInCart={setBooksInCart}
        />
      </div>
    </div>
  );
}
