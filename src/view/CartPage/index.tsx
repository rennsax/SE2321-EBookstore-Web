import { UseQueryOptions, useQueries, useQuery } from "@tanstack/react-query";
import "css/CartPage.css";

import BackToBookPage from "components/BackToBookPage";
import CartHeader from "./CartHeader";
import Checkout from "./Checkout";

// TODO the avatar should not be saved in test directory
import avatar from "assets/test/Linus.png";
import { useContext } from "react";
import { createQueryOptionsBookOrdered } from "service/BookService";
import { getBookOrderedList } from "service/OrderService";
import { UserInfoContext } from "view/HomePage";
import BookBuyCard from "./BookBuyCard";
import { CircularProgress } from "@mui/material";

export default function CartPage() {
  let bookCountSum = 0;
  const queries: UseQueryOptions<Book>[] = [];
  const orderId = useContext(UserInfoContext)?.orderId;

  const {
    data: bookOrderedList,
    isSuccess: isGetOrderListSuccess,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ["bookOrderedList", orderId],
    queryFn: async () => {
      if (orderId === undefined) {
        throw new Error("The order's id isn't provided.");
      }
      return await getBookOrderedList(orderId);
    },
  });

  if (isGetOrderListSuccess) {
    bookOrderedList.forEach((bookOrdered) => {
      bookCountSum += bookOrdered.quantity;
      // set queries
      queries.push(
        createQueryOptionsBookOrdered(bookOrdered.uuid, isGetOrderListSuccess)
      );
    });
  }

  const results = useQueries<UseQueryOptions<Book>[]>({ queries });
  const bookBuyElements: JSX.Element[] = [];
  // TODO use a more precise way
  let sumPrice = 0;
  let allIsSuccess = isGetOrderListSuccess;

  results.forEach((res, i) => {
    const { data, isSuccess } = res;
    if (isSuccess && isGetOrderListSuccess) {
      sumPrice += bookOrderedList[i].quantity * data.price;
      bookBuyElements.push(
        <BookBuyCard
          book={data}
          quantity={bookOrderedList[i].quantity}
          key={`bookCartCard${i}`}
          refetch={() => {
            refetchOrder();
          }}
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
        {allIsSuccess ? (
          bookBuyElements
        ) : (
          <CircularProgress
            size={60}
            sx={{ display: "block", margin: "100px auto 0" }}
            color="info"
          />
        )}
      </div>
      <div className="cart-page__right">
        <Checkout avatar={avatar} sumPrice={sumPrice}/>
      </div>
    </div>
  );
}
