type UserType = "SUPER" | "NORMAL" | "FORBIDDEN";

type UserInfo = {
  readonly id: number;
  readonly orderId: number;
  readonly avatarId: number;
  readonly name: string;
};

type OrderState = "PENDING" | "TRANSPORTING" | "COMPLETE";

type OrderInfo = {
  readonly id: number;
  readonly time: Date;
  readonly sumBudget: string;
  readonly state: OrderState;
  readonly bookOrderedList: BookOrdered[];
  readonly userId: number;
};

type BookOrdered = {
  readonly uuid: string;
  quantity: number;
};

interface UserInfoForAdmin {
  id: number;
  name: string;
  userType: UserType;
  avatarId: string;
  account: string;
  passwd: string;
}

type LoginResult =
  | "response error"
  | "login success"
  | "login error"
  | "super user"
  | "forbidden user";

type RegisterResult = "account conflict" | "register success" | "response error";
