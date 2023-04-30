import myFetch from "utils/ajax";
import api from "./api.json";

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

export async function getAllOrderInfo(userId: number): Promise<OrderInfo> {
  const props: FetchProps = {
    url: `${api.order}?userId=${userId}`,
    method: "GET",
  };
  const data = await myFetch(props).then((res) => {
    return res.json();
  });
  return data;
}

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
