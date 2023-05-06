type BookOrdered = {
  readonly uuid: string;
  readonly quantity: number;
  // TODO represent on front-end
  readonly totalBudget: string;
}

type Book = {
  readonly uuid: string; // primary key
  title: string;
  author: string;
  price: string;
  picId: string;
  date: string;
  isbn: string;
  description: string;
  // TODO add intro
  intro?: string;
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
