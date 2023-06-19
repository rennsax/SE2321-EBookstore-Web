import { Navigate, RouteObject } from "react-router-dom";
import BookController from "view/Admin/BookController";
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
    path: "",
    element: <Navigate to="users" />,
  },
];

export default adminRoutes;
