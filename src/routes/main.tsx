import { Navigate } from "react-router-dom";
import BookPage from "view/BookPage";
import OrderPage from "view/OrderPage";
import ProfilePage from "view/ProfilePage";

export default [
  {
    path: "books",
    element: <BookPage />,
  },
  // TODO order page?
  {
    path: "orders",
    element: <OrderPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "",
    element: <Navigate to="books" />,
  },
];
