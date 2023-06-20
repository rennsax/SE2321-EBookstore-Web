import React from "react";
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
import { useSearchParams } from "react-router-dom";
import { getBookListForDisplay, searchBook } from "service/BookService";
import { defaultQueryOptions } from "service/defaultQueryOptions";
import useAppContext from "utils/useAppContext";

const SearchMode: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("s") as string;

  const {
    isSuccess,
    data: bookContentList,
    error,
  } = useQuery({
    queryKey: ["bookListInformation", "searched", keyword],
    queryFn: async () => {
      await timer(1000);
      return await searchBook(keyword);
    },
    ...defaultQueryOptions,
    onError: () => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
  });
  return <BookList isSuccess={isSuccess} bookContentList={bookContentList} />
};

export default function BookPage() {
  const perRow = config["bookPage.perRow"];
  const [{ bookPage }, dispatch] = useAppContext();
  const [page, setPage] = useState<number>(bookPage);
  const [searchParams] = useSearchParams();
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    const keyword = searchParams.get("s")?.trim();
    if (keyword && keyword.length !== 0) {
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
    }
  }, [searchParams]);

  // navigating page
  useEffect(() => {
    dispatch({ bookPage: () => page });
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
      {isSearchMode ? (
        <SearchMode />
      ) : (
        <>
          <BookList isSuccess={isSuccess} bookContentList={bookContentList} />
          <Pagination
            count={6}
            sx={{ mb: "40px" }}
            size="large"
            page={page}
            onChange={(e, v) => setPage(v)}
            color="primary"
          />
        </>
      )}
    </div>
  );
}
