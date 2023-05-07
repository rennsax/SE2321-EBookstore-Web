import myFetch from "utils/ajax";
import api from "./api.json";
import { checkResponse } from "utils/ajax";

/** Get all ordered books of an order. */
export async function getOrderInfo(
  orderId: number
): Promise<OrderInfo> {
  const props: FetchProps = {
    url: `${api.order}/${orderId}`,
    method: "GET",
  };
  const data: OrderInfo = await myFetch(props).then((res) => {
    return checkResponse(res);
  });
  return data;
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
  // eslint-disable-next-line
  data.forEach((orderInfo: any) => {
    orderInfo.time = new Date(orderInfo.time);
  })
  return data;
}

/** Update the items of an order */
export async function updateOrderItem(
  orderId: number,
  uuid: string,
  quantity: number
): Promise<void> {
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
export async function checkoutOrder(orderId: number): Promise<void> {
  const props: FetchProps = {
    url: `${api["order.submit"]}`,
    method: "POST",
    params: {
      orderId
    },
  };
  await myFetch(props);
}