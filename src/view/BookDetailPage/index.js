// TODO consider not putting the book detail page in a separate app
import 'css/BookDetailPage.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import BackToBookPage from 'components/BackToBookPage'

import BookInfo from './BookInfo'

import content from "assets/books.json" // TODO books.json

export default function BookDetailPage() {
  const { name } = useParams();
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
        <BackToBookPage />
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