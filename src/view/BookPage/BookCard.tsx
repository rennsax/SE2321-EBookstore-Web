import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export default function BookCard({
  bookContent,
}: {
  bookContent?: BookContent;
}) {
  const navigate = useNavigate();
  /* if no bookContent is provided, return a skeleton */
  const loading = bookContent === undefined;
  const { abb, title, price, url } = bookContent ?? {};

  return (
    <div
      className="book-card"
      onClick={loading ? undefined : () => navigate(`../bd/${abb}`)}
    >
      <div className="book-card__pic">
        {loading ? (
          <Skeleton
            sx={{ height: "200px", width: "90%", margin: "0 auto" }}
            animation="wave"
          />
        ) : (
          <img alt={"book picture of" + title} src={url}></img>
        )}
      </div>
      <div className="book-card__info">
        <div className="book-card__info__name">
          {loading ? <Skeleton animation="wave" /> : title}
        </div>
        <div className="book-card__info__price">
          {loading ? <Skeleton animation="wave" /> : "$" + price}
        </div>
      </div>
    </div>
  );
}
