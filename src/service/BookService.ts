import { UseQueryOptions } from "@tanstack/react-query";
import myFetch, { checkResponse } from "utils/ajax";
import api from "./api.json";
import config from "./configuration.json";

export async function getBookListForDisplay(
  limit: number,
  offset?: number
): Promise<Book[]> {
  const props: FetchProps = {
    url: `${api["book.info"]}?limit=${limit}&offset=${offset ?? 0}`,
    method: "GET",
  };
  const data: Book[] = await myFetch(props).then((res) => {
    return checkResponse(res);
  });
  return data;
}

export async function getBookByUuid(uuid: string): Promise<Book> {
  const props: FetchProps = {
    url: `${api["book.info"]}/${uuid}`,
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
