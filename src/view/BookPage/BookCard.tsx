import Skeleton from "@mui/material/Skeleton";
import config from "config/front.json";
import { useNavigate } from "react-router-dom";

export default function BookCard({
  bookContent,
}: {
  bookContent?: BookContent;
}) {
  const navigate = useNavigate();
  /* if no bookContent is provided, return a skeleton */
  const isLoading = bookContent === undefined;
  const { title, price, uuid, picId } = bookContent ?? {};

  return (
    <div
      className="book-card"
      onClick={isLoading ? undefined : () => navigate(`../bd/${uuid}`)}
    >
      <div className="book-card__pic">
        {isLoading ? (
          <Skeleton
            sx={{ height: "200px", width: "90%", margin: "0 auto" }}
            animation="wave"
          />
        ) : (
          <img
            alt={"Picture of " + title}
            src={`${config["book.picture.url"]}/${picId}.jpg`}
          ></img>
        )}
      </div>
      <div className="book-card__info">
        <div className="book-card__info__name">
          {isLoading ? <Skeleton animation="wave" /> : title}
        </div>
        <div className="book-card__info__price">
          {isLoading ? <Skeleton animation="wave" /> : "$" + price}
        </div>
      </div>
    </div>
  );
}
