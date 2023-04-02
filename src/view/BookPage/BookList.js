import React from 'react'
import BookCard from './BookCard'
import content from "assets/books.json" // TODO books.json

export default function BookList({ perRow }) {
  // const createList = () => {
  //   const { numList } = props;
  //   let res = [];
  //   for (let i = 0; i < 4; ++i) {
  //     res.push(bookNumber(numList[i]));
  //   }
  //   res.map((obj) => {
  //     return <div>{obj}</div>;
  //   })
  //   return res;
  // };

  const createItem = () => {
    let res = [];
    let bookNum = content.length;
    let book_i = 0;

    while (book_i < bookNum) {
      let row = [];
      for (let i = 0; i < perRow; ++i) {
        if (book_i >= bookNum)
          break;
        const {title, url, price, abb} = content[book_i];
        row.push(
          <BookCard bookName={title} picSrc={url} price={price} bookAbb={abb} key={abb} />
        )
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

    return (
      <>
        {createItem()}
      </>
    )
}
