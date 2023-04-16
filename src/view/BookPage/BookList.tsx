import React, { useContext, useMemo } from "react";
import BookCard from "./BookCard";
import { BookInfoListContext } from "view/HomePage";

export default function BookList({ perRow }: { perRow: number }) {
  const bookContentList = useContext(BookInfoListContext);

  const itemList = useMemo(() => {
    const book_cnt = perRow * 2;
    const res: JSX.Element[] = [];
    let book_i = 0;

    while (book_i < book_cnt) {
      const row: JSX.Element[] = [];
      for (let i = 0; i < perRow; ++i) {
        row.push(
          <BookCard
            bookContent={bookContentList ? bookContentList[book_i] : undefined}
            key={`bookPresented${book_i}`} // TODO change the key to uuid
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
  }, [perRow, bookContentList]);

  return <>{itemList}</>;
}
