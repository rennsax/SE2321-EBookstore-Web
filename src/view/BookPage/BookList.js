import React, { Component } from 'react'
// import Book, { bookNumber } from './Book'
import Book from './Book'
import books from "../../assets/books.json"

export default class BookList extends Component {
  createList = () => {
    const { numList } = this.props;
    let res = [];
    for (let i = 0; i < 4; ++i) {
      res.push(bookNumber(numList[i]));
    }
    res.map((obj) => {
      return <div>{obj}</div>;
    })
    return res;
  }

  createItem = () => {
    const { perRow } = this.props;
    const { content } = books;
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
          <Book bookName={title} picSrc={url} price={price} bookAbb={abb} key={abb} />
        )
        // console.log(row);
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

  render() {
    return (
      <div className="book-column">
        {/* <div className='book-list'>
          {this.createList()}
        </div> */}
        {this.createItem()}
      </div>

    )
  }
}
