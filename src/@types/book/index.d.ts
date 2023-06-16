interface BookOrdered {
  readonly uuid: string;
  readonly quantity: number;
  readonly totalBudget: string;
}

interface Book {
  readonly uuid: string; // primary key
  readonly title: string;
  readonly author: string;
  readonly price: string;
  readonly picId: string;
  readonly date: string;
  readonly isbn: string;
  readonly description: string;
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
