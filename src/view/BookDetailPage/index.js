// TODO consider not putting the book detail page in a separate app
import 'css/BookDetailPage.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { LeftArrow } from 'assets/icons'

import BookInfo from './BookInfo'

import content from "assets/books.json" // TODO books.json

export default function BookDetailPage(props) {
  const { name } = props.match.params;
  const bookObj = (function () {
    let res = {};
    content.every((obj) => {
      if (obj.abb === name) {
        res = obj;
        return false;
      }
      return true;
    })
    return res;
  })();
  const { url, description } = bookObj;

  return (
    <div className='bdp'>
      <div className="bdp-top">
        <Link to="/m/books">
          <div className="cart-page__left__back">
            <LeftArrow />
            <h4>
              Continue Shopping
            </h4>
          </div>
        </Link>
      </div>
      <hr style={{ border: "0", borderBottom: "1px solid rgba(0,0,0,0.3)", margin: "30px 0" }} />
      <div className="bdp-main">
        <div className="bdp-left">
          <img src={url} alt="Linux" style={{ width: "240px" }} />
        </div>
        <div className="bdp-right">
          <BookInfo {...bookObj} />
        </div>
      </div>
      <hr style={{ border: "0", borderBottom: "1px solid rgba(0,0,0,0.3)", margin: "30px 0" }} />
      <div className='bdp-bottom'>
        <h3 className="bdp-bottom__title">
          Book description
        </h3>
        {description}
      </div>
    </div>
  )
}