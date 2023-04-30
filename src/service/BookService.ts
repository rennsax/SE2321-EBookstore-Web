import { UseQueryOptions } from "@tanstack/react-query";
import myFetch from "utils/ajax";
import api from "./api.json";
import config from "./configuration.json";

export async function getBookListForDisplay(limit: number): Promise<Book[]> {
  const props: FetchProps = {
    url: `${api["book.info"]}?limit=${limit}`,
    method: "GET",
  };
  const data: Book[] = await myFetch(props).then((res) => {
    return res.json();
  });
  return data;
}

export async function getBookByUuid(uuid: string): Promise<Book> {
  const props: FetchProps = {
    url: `${api["book.info"]}/${uuid}`,
    method: "GET",
  };
  const data: Book = await myFetch(props).then((res) => {
    return res.json();
  });
  return data;
}

export function createQueryOptionsBookOrdered(uuid: string, enabled: boolean): UseQueryOptions<Book> {
  return {
    queryKey: ["bookInCart", uuid],
    queryFn: async () => {
      return await getBookByUuid(uuid);
    },
    retry: config["ajax.retry.maxTimes"],
    retryDelay: config["ajax.retry.delay"],
    enabled
  };
}
