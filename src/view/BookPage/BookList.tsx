import React, { useContext } from "react";
import BookCard from "./BookCard";
import { BookInfoListContext } from "view/HomePage";

export default function BookList({ perRow }: { perRow: number }) {
  const bookContentList = useContext(BookInfoListContext);

  const createItem = () => {
    if (bookContentList === undefined) return <></>;
    // get book info from back end

    let res = [];
    let bookNum = bookContentList.length;
    let book_i = 0;

    while (book_i < bookNum) {
      let row = [];
      for (let i = 0; i < perRow; ++i) {
        if (book_i >= bookNum) break;
        const { title, url, price, abb } = bookContentList[book_i];
        row.push(
          <BookCard
            bookName={title}
            picSrc={url}
            price={price}
            bookAbb={abb}
            key={abb}
          />
        );
        ++book_i;
      }
      res.push(
        <div className="book-list" key={`book_list${book_i}`}>
          {row}
        </div>
      );
    }
    return res;
  };

  return <>{createItem()}</>;
}
