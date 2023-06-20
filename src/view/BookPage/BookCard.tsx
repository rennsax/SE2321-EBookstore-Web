import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import api from "service/api.json";

export default function BookCard({
  bookContent,
  empty = false,
}: {
  bookContent?: Book;
  empty?: boolean;
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
      {empty ? null : (
        <>
          <div className="book-card__pic">
            {isLoading ? (
              <Skeleton
                sx={{ height: "200px", width: "90%", margin: "0 auto" }}
                animation="wave"
              />
            ) : (
              <img
                alt={"Picture of " + title}
                src={`${api["book.picture"]}/${picId}.jpg`}
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
        </>
      )}
    </div>
  );
}
