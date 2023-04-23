import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import myFetch, { FetchProps } from "utils/ajax";
import timer from "utils/timer";
import BookCard from "./BookCard";

import config from "config/front.json";

export default function BookList() {
  const perRow = config["bookPage.perRow"];

  const fetchProps: FetchProps = {
    method: "GET",
    // Backend: query param `number`
    url: `${config["url.book.info"]}?number=${perRow * 2}`,
  };

  const {
    isSuccess,
    data: bookContentList,
    error,
  } = useQuery({
    queryKey: ["bookListInformation", fetchProps],
    queryFn: async () => {
      await timer(1000);
      const data = await myFetch(fetchProps).then((res) => {
        return res.json();
      });
      return data as BookContent[];
    },
    retry: config["ajax.retry.maxTimes"],
    retryDelay: config["ajax.retry.delay"],
    refetchOnMount: false,
    onSuccess: () => {
      console.log("Fetched!");
    }, // TODO debug
    onError: () => {
      console.log(error);
    },
  });
  console.log(bookContentList); // TODO debug

  const itemList = useMemo(() => {
    const book_cnt = perRow * 2;
    const res: JSX.Element[] = [];
    let book_i = 0;

    while (book_i < book_cnt) {
      const row: JSX.Element[] = [];
      for (let i = 0; i < perRow; ++i) {
        row.push(
          <BookCard
            bookContent={isSuccess ? bookContentList?.at(book_i) : undefined}
            key={`bookPresented${book_i}`}
          />
        );
        ++book_i;
      }
      res.push(
        <div className="book-list" key={`bookRow${book_i / perRow}`}>
          {row}
        </div>
      );
    }
    return res;
  }, [perRow, bookContentList, isSuccess]);

  return <>{itemList}</>;
}
