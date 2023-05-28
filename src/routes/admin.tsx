import { Navigate, RouteObject } from "react-router-dom";
import UserController from "view/Admin/UserController";

const adminRoutes: RouteObject[] = [
  {
    path: "users",
    element: <UserController />,
  },
  {
    path: "",
    element: <Navigate to="users" />,
  },
];

export default adminRoutes;
