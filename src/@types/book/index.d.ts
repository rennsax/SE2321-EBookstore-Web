interface BookOrdered {
  readonly uuid: string;
  readonly quantity: number;
  readonly totalBudget: string;
}

interface Book {
  uuid: string; // primary key
  title: string;
  author: string;
  price: string;
  picId: string;
  date: string;
  isbn: string;
  description: string;
  stock: number;
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
