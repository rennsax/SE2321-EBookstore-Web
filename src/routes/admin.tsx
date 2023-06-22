import { Navigate, RouteObject } from "react-router-dom";
import BookController from "view/Admin/BookController";
import OrderController from "view/Admin/OrderController";
import Statistic from "view/Admin/Statistic";
import UserController from "view/Admin/UserController";

const adminRoutes: RouteObject[] = [
  {
    path: "users",
    element: <UserController />,
  },
  {
    path: "books",
    element: <BookController />,
  },
  {
    path: "orders",
    element: <OrderController />,
  },
  {
    path: "statistic",
    element: <Statistic />
  },
  {
    path: "",
    element: <Navigate to="users" />,
  },
];

export default adminRoutes;
