import React from 'react'

import BackToBookPage from 'components/BackToBookPage'
import BookBuy from './BookBuy'
import CartHeader from './CartHeader'
import Checkout from './Checkout'

import "css/CartPage.css"

// TODO the resource should not be saved in test directory
import book1 from "assets/test/book1.jpg"
import book2 from "assets/test/book2.jpg"
import avatar from "assets/test/Linus.png"

export default function CartPage() {
  return (
    <div className='cart-page'>
      <div className="cart-page__left">
        <BackToBookPage />
        <hr />
        <CartHeader number={2} />
        {/* TODO with back end */}
        <BookBuy img={book1} title={"Core Java (I)"}
          details={"Book by Cay S. Horstmann and Gary Cornell"}
        />
        <BookBuy img={book2} title={"CS: APP"}
          details={"Computer Systems: A Programmer's Perspective"}
        />
      </div>
      <div className="cart-page__right">
        <Checkout avatar={avatar} />
      </div>
    </div>
  )
}
