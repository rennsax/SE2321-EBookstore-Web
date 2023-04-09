import "css/CartPage.css"
import React from 'react'

import BackToBookPage from 'components/BackToBookPage'
import BookBuy, {BookBuyProps} from './BookBuy'
import CartHeader from './CartHeader'
import Checkout from './Checkout'

import bookContentList from "assets/books.json" // TODO books.json

// TODO the avatar should not be saved in test directory
import avatar from "assets/test/Linus.png"

export default function CartPage({ booksInCart, setBooksInCart } : BooksInCartState) {
  let bookCountSum: number = 0;
  booksInCart?.forEach(books => bookCountSum += books.count);

  const BookBuyList: JSX.Element[] = [];

  booksInCart.forEach(book => {
    let res: BookContent | undefined;
    bookContentList.every((obj) => {
      if (obj.abb === book.bookID) {
        res = obj;
        return false;
      }
      return true;
    })
    const neededInfo: BookBuyProps = {
      bookID: book.bookID,
      count: book.count,
      img: res?.url,
      title: res?.title,
      authors: res?.authors,
      price: res?.price,
      booksInCart: booksInCart,
      setBooksInCart: setBooksInCart
    }
    BookBuyList.push(
      <BookBuy key={book.bookID} {...neededInfo} />
    )
  })

  return (
    <div className='cart-page'>
      <div className="cart-page__left">
        <BackToBookPage />
        <hr />
        <CartHeader number={bookCountSum} />
        {/* TODO with back end */}
        {BookBuyList}
      </div>
      <div className="cart-page__right">
        <Checkout avatar={avatar} />
      </div>
    </div>
  )
}
