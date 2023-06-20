import { useMemo } from "react";
import BookCard from "./BookCard";

import config from "config/front.json";

export default function BookList({
  isSuccess,
  bookContentList,
}: {
  isSuccess: boolean;
  bookContentList: Book[] | undefined;
}) {
  const perRow = config["bookPage.perRow"];

  console.log(bookContentList)
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
            empty={isSuccess && book_i >= (bookContentList as Book[]).length}
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
