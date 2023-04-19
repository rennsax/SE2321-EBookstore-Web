interface BookInCart {
  readonly bookId: string; // TODO use uuid to represent a book
  count: number;
}

type SetBooksInCartHook = React.Dispatch<React.SetStateAction<BookInCart[]>>;

interface BooksInCartState {
  booksInCart: BookInCart[];
  setBooksInCart: SetBooksInCartHook;
}

interface BookContent {
  uuid: string; // primary key
  title: string;
  author: string;
  price: number;
  picId: string;
  date: string;
  isbn: string;
  description: string;
  // TODO add intro
  intro?: string;

  /** @deprecated */
  url?: string;
  /** @deprecated */
  authors?: Array<string>;
  /** @deprecated */
  abb?: string;
}

type ButtonEvent = React.SyntheticEvent | Event;
