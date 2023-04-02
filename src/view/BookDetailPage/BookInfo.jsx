import React from 'react'
import { FlagFill, Cart4 } from 'assets/icons';

export default function BookInfo({ title, date, authors, price, isbn, intro }) {
  return (
    <div className='book-details'>
      <h2 className='book-details__title'>{title}</h2>
      <h4 className='book-details__author'><span>by</span> <span id="book-author">
        {authors.join(', ')}
      </span></h4>
      <p className='book-details__date'>Released on {date}</p>
      <p className='book-details__isbn'>ISBN: {isbn}</p>
      <p className='book-details__intro'>
        <FlagFill />
        {intro}
      </p>
      <div className='flex-space-between'>
        <button className='book-details__buy'>
          <span>Buy Now</span>
          <span>{`$${price}`}</span>
        </button>
        <div style={{ width: "16px" }}></div>
        <button className='book-details__buy'>
          <span>Add to Cart</span>
          <span>
            <Cart4 />
          </span>
        </button>
      </div>
    </div>
  )
}