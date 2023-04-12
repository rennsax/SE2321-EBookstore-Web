import React from "react";
import { useNavigate } from "react-router-dom";

interface BookCardPops {
  bookName: string;
  picSrc: string;
  price?: number;
  bookAbb: string;
}

export default function BookCard({
  bookName,
  picSrc,
  price,
  bookAbb,
}: BookCardPops) {
  const navigate = useNavigate();
  return (
    <div className="book-card" onClick={() => navigate(`../bd/${bookAbb}`)}>
      <div className="book-card__pic">
        <img alt={"book picture of" + bookName} src={picSrc}></img>
      </div>
      <div className="book-card__info">
        <div className="book-card__info__name">{bookName}</div>
        <div className="book-card__info__price">{"$" + price}</div>
      </div>
    </div>
    // </Link>
  );
}
