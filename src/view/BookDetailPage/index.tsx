import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import BackToBookPage from "components/BackToBookPage";
import "css/BookDetailPage.css";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import myFetch, { FetchProps } from "utils/ajax";

import config from "config/front.json";
import BookInfo from "./BookInfo";

export default function BookDetailPage({
  booksInCart,
  setBooksInCart,
}: BooksInCartState) {
  const { uuid } = useParams(); // "/home/bd/:uuid"

  const fetchBookProps: FetchProps = {
    method: "GET",
    url: `${config["url.book.info"]}/${uuid}`,
  };

  const { data: bookContent, isSuccess } = useQuery<BookContent>({
    queryKey: [`bookDetails${uuid}`, fetchBookProps],
    queryFn: async () => {
      const data = await myFetch(fetchBookProps).then((res) => {
        return res.json();
      });
      return data;
    },
    retry: config["ajax.retry.maxTimes"],
    retryDelay: config["ajax.retry.delay"],
    refetchOnMount: false,
  });

  const { picId, title, description } = bookContent ?? {};
  return (
    <div className="bdp">
      <div className="bdp-top">
        <BackToBookPage />
      </div>
      <hr
        style={{
          border: "0",
          borderBottom: "1px solid rgba(0,0,0,0.3)",
          margin: "30px 0",
        }}
      />
      <div className="bdp-main">
        <div className="bdp-left">
          {isSuccess ? (
            <img
              src={`${config["url.book.picture"]}/${picId}.jpg`}
              alt={title}
              style={{ width: "240px" }}
            />
          ) : (
            <Skeleton sx={{ height: "200px" }} />
          )}
        </div>
        <div className="bdp-right">
          {isSuccess ? (
            <BookInfo
              {...(bookContent as BookContent)}
              booksInCart={booksInCart}
              setBooksInCart={setBooksInCart}
            />
          ) : (
            <Skeleton sx={{ height: "200px" }} />
          )}
        </div>
      </div>
      <hr
        style={{
          border: "0",
          borderBottom: "1px solid rgba(0,0,0,0.3)",
          margin: "30px 0",
        }}
      />
      <div className="bdp-bottom">
        <h3 className="bdp-bottom__title">Book description</h3>
        {isSuccess ? HTMLReactParser(description ?? "") : <></>}
      </div>
    </div>
  );
}
