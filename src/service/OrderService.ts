import { Dayjs } from "dayjs";
import myFetch, { checkResponse } from "utils/ajax";
import api from "./api.json";

/** Get all ordered books of an order. */
export async function getOrderInfo(orderId: number): Promise<OrderInfo> {
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
export async function getOrderInfoByUserId(
  userId: number,
  keyword?: string,
  beginDate?: Dayjs,
  endDate?: Dayjs
): Promise<OrderInfo[]> {
  const searchParams = {
    userId: userId.toString(),
    ...(beginDate && { beginDate: beginDate.format("YYYY-MM-DD") }),
    ...(endDate && { endDate: endDate.format("YYYY-MM-DD") }),
    ...(keyword && keyword.length !== 0 && { keyword: keyword }),
  };
  const props: FetchProps = {
    url: `${api.order}?${new URLSearchParams(searchParams)}`,
    method: "GET",
  };
  const data = await myFetch(props).then((res) => {
    return res.json();
  });
  // eslint-disable-next-line
  data.forEach((orderInfo: any) => {
    orderInfo.time = new Date(orderInfo.time);
  });
  return data;
}

export async function getAllOrderInfo(
  keyword?: string,
  beginDate?: Dayjs,
  endDate?: Dayjs
): Promise<OrderInfo[]> {
  const searchParams = {
    ...(beginDate && { beginDate: beginDate.format("YYYY-MM-DD") }),
    ...(endDate && { endDate: endDate.format("YYYY-MM-DD") }),
    ...(keyword && keyword.length !== 0 && { keyword: keyword }),
  };
  const props: FetchProps = {
    url: `${api.order}/all?${new URLSearchParams(searchParams)}`,
    method: "GET",
  };
  const data = await myFetch(props).then((res) => {
    return res.json();
  });
  // eslint-disable-next-line
  data.forEach((orderInfo: any) => {
    orderInfo.time = new Date(orderInfo.time);
  });
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
    body: {
      op: "update items",
      bookOrdered: {
        uuid,
        quantity,
      },
    },
  };
  await myFetch(props);
}

/** Submit a "pending" order */
export async function checkoutOrder(orderId: number): Promise<void> {
  const props: FetchProps = {
    url: `${api["order"]}/${orderId}`,
    method: "PATCH",
    body: {
      op: "checkout",
    },
  };
  await myFetch(props);
}
