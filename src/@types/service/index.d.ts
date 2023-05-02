interface UserInfo {
  readonly id: number;
  orderId: number;
}

type OrderState = "PENDING" | "TRANSPORTING" | "COMPLETE";

interface OrderInfo {
  readonly id: number;
  readonly time: Date;
  readonly state: OrderState;
  readonly bookOrderedList: BookOrdered[];
}

interface BookOrdered {
  readonly uuid: string;
  quantity: number;
}
