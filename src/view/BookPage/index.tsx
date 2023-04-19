import React from "react";
import BookList from "./BookList";
import SearchBar from "./SearchBar";
import BookCarousel from "./Carousel";
import "css/BookPage.css";
import config from "config/front.json";

export default function BookPage() {
  return (
    <div className="book-page">
      <SearchBar />
      <BookCarousel />
      <BookList perRow={config["bookPage.perRow"]} />
    </div>
  );
}
