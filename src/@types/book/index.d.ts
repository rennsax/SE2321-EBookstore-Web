interface BookInCart {
  readonly bookID: string; // TODO use uuid to represent a book
  count: number;
}

type SetBooksInCartHook = React.Dispatch<React.SetStateAction<BookInCart[]>>;

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
