import "css/BookDetailPage.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToBookPage from "components/BackToBookPage";
import { BookInfoListContext } from "view/HomePage";
import Skeleton from "@mui/material/Skeleton";
import HTMLReactParser from "html-react-parser";

import config from "config/front.json";
import BookInfo from "./BookInfo";

export default function BookDetailPage({
  booksInCart,
  setBooksInCart,
}: BooksInCartState) {
  const { uuid } = useParams(); // "/home/bd/:uuid"
  const bookContentList = useContext(BookInfoListContext);
  const [loading, setLoading] = useState<boolean>(true);

  const bookObj = (function (bookContentList: Array<BookContent>) {
    let res: BookContent | undefined;
    for (const bookContent of bookContentList) {
      if (bookContent.uuid === uuid) {
        res = bookContent;
        break;
      }
    }
    return res;
  })(bookContentList);

  useEffect(() => {
    // TODO loading condition
    setLoading(false);
  }, [bookContentList]);

  const { picId, title, description } = bookObj ?? {};

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
          {loading ? (
            <Skeleton sx={{ height: "200px" }} />
          ) : (
            <img
              src={`${config["book.picture.url"]}/${picId}.jpg`}
              alt={title}
              style={{ width: "240px" }}
            />
          )}
        </div>
        <div className="bdp-right">
          {loading ? (
            <Skeleton sx={{ height: "200px" }} />
          ) : (
            <BookInfo
              {...(bookObj as BookContent)}
              booksInCart={booksInCart}
              setBooksInCart={setBooksInCart}
            />
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
        {loading ? <></> : HTMLReactParser(description ?? "")}
      </div>
    </div>
  );
}
