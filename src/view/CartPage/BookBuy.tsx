import React from 'react'
import { Trash } from '../../assets/icons'
import { Link } from 'react-router-dom';

interface BookBuyInfo {
  bookID: string;
  count: number;
  img?: string;
  title?: string;
  authors?: string[];
  price?: number;
}

export type BookBuyProps = BookBuyInfo & BooksInCartState;

export default function BookBuy(
  { bookID, img, title, authors, price, count, booksInCart, setBooksInCart }: BookBuyProps
) {
  const handleDelete = (e: ButtonEvent): void => {
    e.preventDefault();
    setBooksInCart(booksInCart.filter(book => book.bookID !== bookID));
  };

  return (
    <div className='cart-card flex-space-between'>
      <div className="cart-card__info flex-space-between">
        <div className="cart-card__info__pic">
          <Link to={`/home/bd/${bookID}`}>
            <img src={img} alt="book1" />
          </Link>
        </div>
        <div className="cart-card__info__text flex-space-between">
          <div className="cart-card__info__text__title">
            <h5>{title}</h5>
          </div>
          <div className="cart-card__info__text__details">{authors?.toString()}</div>
        </div>
      </div>
      <div className="cart-card__right flex-space-between">
        {/* TODO increase or decrease */}
        <div className="cart-card__right__num">{count}</div>
        <div className="cart-card__right__price">{`$${price}`}</div>
        <div className="cart-card__right__delete" onClick={handleDelete}>
          <Trash />
        </div>
      </div>
    </div>
  )
}