import BookList from "./BookList";
import SearchBar from "./SearchBar";
// TODO carousel
// import BookCarousel from "./Carousel";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "@tanstack/react-query";
import "css/BookPage.css";
import timer from "utils/timer";

import config from "config/front.json";
import { useEffect, useState } from "react";
import { getBookListForDisplay } from "service/BookService";
import { defaultQueryOptions } from "service/queryOptions";
import useAppContext from "utils/useAppContext";

export default function BookPage() {
  const perRow = config["bookPage.perRow"];
  const [{ bookPage }, dispatch] = useAppContext();
  const [page, setPage] = useState<number>(bookPage);

  useEffect(() => {
    return () => {
      dispatch({ bookPage: () => page });
    };
  });

  const {
    isSuccess,
    data: bookContentList,
    error,
  } = useQuery({
    queryKey: ["bookListInformation", perRow, page],
    queryFn: async () => {
      await timer(1000);
      return await getBookListForDisplay(perRow * 2, (page - 1) * perRow * 2);
    },
    ...defaultQueryOptions,
    onError: () => {
      console.log(error);
    },
  });

  return (
    <div className="book-page">
      <SearchBar />
      {/* <BookCarousel /> */}
      <BookList isSuccess={isSuccess} bookContentList={bookContentList} />
      <Pagination
        count={5}
        sx={{ mb: "40px" }}
        size="large"
        page={page}
        onChange={(e, v) => setPage(v)}
        color="primary"
      />
    </div>
  );
}
