import { Navigate, RouteObject } from "react-router-dom";
import BookDetailPage from "view/BookDetailPage";
import BookPage from "view/BookPage";
import CartPage from "view/CartPage";
import OrderPage from "view/OrderPage";
import ProfilePage from "view/ProfilePage";

const mainRoutes: RouteObject[] = [
  {
    path: "books",
    element: <BookPage />,
  },
  {
    path: "orders/*",
    element: <OrderPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "bd/:uuid",
    element: <BookDetailPage />,
  },
  {
    path: "",
    element: <Navigate to="books" />,
  },
];

export default mainRoutes;
