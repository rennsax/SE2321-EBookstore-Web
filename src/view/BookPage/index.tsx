import BookList from "./BookList";
import SearchBar from "./SearchBar";
// TODO carousel
// import BookCarousel from "./Carousel";
import "css/BookPage.css";

export default function BookPage() {
  return (
    <div className="book-page">
      <SearchBar />
      {/* <BookCarousel /> */}
      <BookList />
    </div>
  );
}
