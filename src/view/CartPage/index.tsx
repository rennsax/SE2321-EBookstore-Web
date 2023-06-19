import { UseQueryOptions, useQueries, useQuery } from "@tanstack/react-query";
import "css/CartPage.css";

import BackToBookPage from "components/BackToBookPage";
import CartHeader from "./CartHeader";
import Checkout from "./Checkout";

import { CircularProgress } from "@mui/material";
import { createQueryOptionsBookOrdered } from "service/BookService";
import { getOrderInfo } from "service/OrderService";
import useUserInfo from "utils/useUserInfo";
import BookBuyCard from "./BookBuyCard";
import api from "service/api.json";

export default function CartPage() {
  let bookCountSum = 0;
  const queries: UseQueryOptions<Book>[] = [];
  const { avatarId, orderId } = useUserInfo();
  const avatar = `${api["avatar"]}/${avatarId}.jpg`;

  const {
    data: orderInfo,
    isSuccess: isGetOrderSuccess,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ["bookOrderedList", orderId],
    queryFn: async () => {
      if (orderId === undefined) {
        throw new Error("The order's id isn't provided.");
      }
      return await getOrderInfo(orderId);
    },
  });

  const { bookOrderedList } = orderInfo ?? { bookOrderedList: [] };

  bookOrderedList.forEach((bookOrdered) => {
    bookCountSum += bookOrdered.quantity;
    // set queries
    queries.push(
      createQueryOptionsBookOrdered(bookOrdered.uuid, isGetOrderSuccess)
    );
  });

  const results = useQueries<UseQueryOptions<Book>[]>({ queries });

  if (!isGetOrderSuccess) {
    return null;
  }

  const bookBuyElements: JSX.Element[] = [];
  let allIsSuccess = true;

  results.forEach((res, i) => {
    const { data, isSuccess } = res;
    if (isSuccess && isGetOrderSuccess) {
      bookBuyElements.push(
        <BookBuyCard
          book={data}
          quantity={bookOrderedList[i].quantity}
          key={`bookCartCard${i}`}
          refetch={async () => {
            await refetchOrder();
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
        <Checkout avatar={avatar} sumBudget={orderInfo.sumBudget} />
      </div>
    </div>
  );
}
