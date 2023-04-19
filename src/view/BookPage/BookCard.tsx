import React from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import config from "config/front.json";

export default function BookCard({
  bookContent,
}: {
  bookContent?: BookContent;
}) {
  const navigate = useNavigate();
  /* if no bookContent is provided, return a skeleton */
  const loading = bookContent === undefined;
  const { title, price, uuid, picId } = bookContent ?? {};

  return (
    <div
      className="book-card"
      onClick={loading ? undefined : () => navigate(`../bd/${uuid}`)}
    >
      <div className="book-card__pic">
        {loading ? (
          <Skeleton
            sx={{ height: "200px", width: "90%", margin: "0 auto" }}
            animation="wave"
          />
        ) : (
          <img
            alt={"book picture of" + title}
            src={`${config["book.picture.url"]}/${picId}.jpg`}
          ></img>
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
