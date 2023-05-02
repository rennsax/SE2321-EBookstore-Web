import myFetch from "utils/ajax";
import api from "./api.json";

/** Get all ordered books of an order. */
export async function getBookOrderedList(
  orderId: number
): Promise<BookOrdered[]> {
  const props: FetchProps = {
    url: `${api.order}/${orderId}`,
    method: "GET",
  };
  const data: OrderInfo = await myFetch(props).then((res) => {
    return res.json();
  });
  return data.bookOrderedList;
}

/** Get all order information of an user */
export async function getAllOrderInfo(userId: number): Promise<OrderInfo[]> {
  const props: FetchProps = {
    url: `${api.order}?userId=${userId}`,
    method: "GET",
  };
  const data = await myFetch(props).then((res) => {
    return res.json();
  });
  return data;
}

/** Update the items of an order */
export async function updateOrderItem(
  orderId: number,
  uuid: string,
  quantity: number
) {
  const props: FetchProps = {
    url: `${api.order}/${orderId}`,
    method: "PATCH",
    params: {
      uuid,
      quantity,
    },
  };
  await myFetch(props);
}

/** Submit a "pending" order */
export async function checkoutOrder(orderId: number) {
  const props: FetchProps = {
    url: `${api["order.submit"]}`,
    method: "POST",
    params: {
      orderId
    },
  };
  await myFetch(props);
}