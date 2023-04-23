interface BookOrdered {
  readonly uuid: string;
  quantity: number;
}

type SetBooksInCartHook = React.Dispatch<React.SetStateAction<BookOrdered[]>>;

interface BooksInCartState {
  booksInCart: BookOrdered[];
  setBooksInCart: SetBooksInCartHook;
}

interface Book {
  readonly uuid: string; // primary key
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
