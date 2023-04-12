import React from "react";
import BookList from "./BookList";
import SearchBar from "./SearchBar";
import BookCarousel from "./Carousel";
import "css/BookPage.css";

export default function BookPage() {
  return (
    <div className="book-page">
      <SearchBar />
      <BookCarousel />
      <BookList perRow={4} />
    </div>
  );
}
