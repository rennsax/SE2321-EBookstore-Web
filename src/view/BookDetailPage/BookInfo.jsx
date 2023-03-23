import React, { Component } from 'react'
import { linux_info } from "../../assets/test/linux-kernel-info"
import { FlagFill, Cart4 } from '../../assets/icons';

export default class BookInfo extends Component {
  render() {
    const { title, date, author, isbn, intro, price } = linux_info;
    return (
      <div className='book-details'>
        <h2 className='book-details__title'>{title}</h2>
        <h4 className='book-details__author'><span>by</span> <span id="book-author">{author}</span></h4>
        <p className='book-details__date'>Released on {date.toLocaleDateString()}</p>
        <p className='book-details__isbn'>ISBN: {isbn}</p>
        <p className='book-details__intro'>
          <FlagFill />
          {intro}
        </p>
        <div className='flex-space-between'>
          <button className='book-details__buy'>
            <span>Buy Now</span>
            <span>{price}</span>
          </button>
          <div style={{width: "16px"}}></div>
          <button className='book-details__buy'>
            <span>Add to Cart</span>
            <span>
              <Cart4/>
            </span>
          </button>
        </div>
      </div>
    )
  }
}