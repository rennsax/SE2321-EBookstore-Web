declare module "*.jpg" {
  const path: string;
  export default path;
}

declare module "*.png" {
  const path: string;
  export default path;
}

interface BookInCart {
  bookID: string; // TODO use uuid to represent a book
  count: number;
}

type SetBooksInCartHook = React.Dispatch<React.SetStateAction<BookInCart[]>>

interface BooksInCartState {
  booksInCart: BookInCart[];
  setBooksInCart: SetBooksInCartHook;
}

interface BookContent {
  title: string;
  url: string;
  authors: Array<string>;
  price?: number;
  abb: string;
  date?: string;
  isbn?: string;
  intro?: string;
  description?: string;
}

type ButtonEvent = React.SyntheticEvent | Event;