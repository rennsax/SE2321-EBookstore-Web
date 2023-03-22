import React, { Component } from 'react'
import BookBuy from './BookBuy'
import CartHeader from './CartHeader'
import "../../css/CartPage.css"
import { LeftArrow } from '../../assets/icons'
import Checkout from './Checkout'
import { NavLink } from 'react-router-dom';

import book1 from "../../assets/test/book1.jpg"
import book2 from "../../assets/test/book2.jpg"

import avatar from "../../assets/test/Linus.png"

export default class CartPage extends Component {
  render() {
    return (
      <div className='cart-page flex-space-between'>
        <div className="cart-page__left">
          <NavLink to="/books">
            <div className="cart-page__left__back">
              <LeftArrow />
              <h4>
                Continue Shopping
              </h4>
            </div>
          </NavLink>
          <hr />
          <CartHeader number={2} />
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
}
