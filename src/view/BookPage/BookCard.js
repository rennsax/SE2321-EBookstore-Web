import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BookCard({ bookName, picSrc, price, bookAbb }) {
  const navigate = useNavigate();
  return (
    <div className="book-card"
      onClick={() => navigate(`../bd/${bookAbb}`)}
    >
      <div className="book-card__pic">
        <img alt={"book picture of" + bookName} src={picSrc}></img>
      </div>
      <div className="book-card__info">
        <div className="book-card__info__name">
          {bookName}
        </div>
        <div className="book-card__info__price">
          {"$" + price}
        </div>
      </div>
    </div>
    // </Link>
  );
}