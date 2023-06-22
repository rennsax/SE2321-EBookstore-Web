import { UseQueryOptions } from "@tanstack/react-query";
import myFetch, { checkResponse } from "utils/ajax";
import api from "./api.json";
import config from "./configuration.json";

export async function getBookListForDisplay(
  limit: number,
  offset?: number
): Promise<Book[]> {
  const props: FetchProps = {
    url: `${api["book"]}?limit=${limit}&offset=${offset ?? 0}`,
    method: "GET",
  };
  const data: Book[] = await myFetch(props).then((res) => {
    return checkResponse(res);
  });
  return data;
}

export async function getBookByUuid(uuid: string): Promise<Book> {
  const props: FetchProps = {
    url: `${api["book"]}/${uuid}`,
    method: "GET",
  };
  const data: Book = await myFetch(props).then((res) => {
    return checkResponse(res);
  });
  return data;
}

export function createQueryOptionsBookOrdered(
  uuid: string,
  enabled: boolean
): UseQueryOptions<Book> {
  return {
    queryKey: ["bookInCart", uuid],
    queryFn: async () => {
      return await getBookByUuid(uuid);
    },
    retry: config["ajax.retry.maxTimes"],
    retryDelay: config["ajax.retry.delay"],
    enabled,
  };
}

export async function searchBook(keyword: string): Promise<Book[]> {
  const props: FetchProps = {
    url: `${api.book}?s=${keyword}`,
    method: "GET"
  }
  return await checkResponse(await myFetch(props));
}

export async function addBook(book: BookAdded): Promise<void> {
  const props: FetchProps = {
    url: `${api.book}`,
    method: "PUT",
    body: book
  }
  const res = await myFetch(props)
  if (res.status < 200 || res.status >= 300) {
    throw "response error!";
  }
}

export const getBookRank = async(orderInfoList: OrderInfo[]): Promise<Array<[Book, number]>> => {
  const count = new Map<string, number>();
  for (const orderInfo of orderInfoList) {
    for (const bookOrdered of orderInfo.bookOrderedList) {
      if (count.has(bookOrdered.uuid))
        count.set(
          bookOrdered.uuid,
          (count.get(bookOrdered.uuid) as number) + bookOrdered.quantity
        );
      else count.set(bookOrdered.uuid, bookOrdered.quantity);
    }
  }
  const result: Array<[Book, number]> = [];
  for (const [uuid, cnt] of count.entries()) {
    result.push([await getBookByUuid(uuid), cnt]);
  }
  return result;
}