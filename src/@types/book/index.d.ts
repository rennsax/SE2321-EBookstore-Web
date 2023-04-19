interface BookInCart {
  readonly bookId: string;
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

interface CheckoutInfo {
  customerId: number;
  date: Date;
  cardType?: "mastercard" | "visa" | "amex" | "paypal";
  name?: string;
  cardNumber?: string;
  cvv?: string;
}
