import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="search_bar">
      {/* <input type="text" autoComplete="off" className="input-bar" placeholder='search for books'/> */}
      <form action="">
        <select
          aria-label="select-book-type"
          name="book_type"
          id="book-type-selector"
          className="search_bar__selector"
        >
          <option value="all">All</option>
          <option value="ed">Education</option>
          <option value="cs">Computer Science</option>
        </select>
        <input
          className="search_bar__input"
          type="text"
          name="q"
          autoComplete="off"
          required
          id="search-books"
          aria-label="search-books"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value);
          }}
        />
        <button
          className="search_bar__button"
          type="submit"
          onClick={(e: ButtonEvent) => {
            e.preventDefault();
            setSearchParams(`?s=${keyword}`);
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}
