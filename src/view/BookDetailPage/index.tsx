import "css/BookDetailPage.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToBookPage from "components/BackToBookPage";
import { BookInfoListContext } from "view/HomePage";
import Skeleton from "@mui/material/Skeleton";

import BookInfo from "./BookInfo";

export default function BookDetailPage({
  booksInCart,
  setBooksInCart,
}: BooksInCartState) {
  const { name } = useParams(); // "/home/bd/:name"
  const bookContentList = useContext(BookInfoListContext);
  const [loading, setLoading] = useState<boolean>(true);

  const bookObj = (function (bookContentList: Array<BookContent>) {
    let res: BookContent | undefined;
    for (const bookContent of bookContentList) {
      if (bookContent.abb === name) {
        res = bookContent;
        break;
      }
    }
    return res;
  })(bookContentList);

  useEffect(() => {
    setLoading(bookObj === undefined);
  }, [bookContentList]);

  const { url, description } = bookObj ?? {};

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
            <img src={url} alt="Linux" style={{ width: "240px" }} />
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
        {loading ? <></> : description}
      </div>
    </div>
  );
}
