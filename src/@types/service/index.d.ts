type UserInfo = {
  readonly id: number;
  readonly orderId: number;
  readonly avatarId: number;
  readonly name: string;
}

type OrderState = "PENDING" | "TRANSPORTING" | "COMPLETE";

type OrderInfo = {
  readonly id: number;
  readonly time: Date;
  readonly state: OrderState;
  readonly bookOrderedList: BookOrdered[];
}

type BookOrdered = {
  readonly uuid: string;
  quantity: number;
}
