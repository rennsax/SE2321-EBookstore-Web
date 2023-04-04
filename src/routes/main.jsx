import { Navigate } from 'react-router-dom';
import BookPage from 'view/BookPage';
import CartPage from 'view/CartPage';
import OrderPage from 'view/OrderPage';
import ProfilePage from 'view/ProfilePage';
import BookDetailPage from 'view/BookDetailPage';

export default [
  {
    path: "books",
    element: <BookPage />
  },
  {
    path: "cart",
    element: <CartPage />
  },
  {
    path: "orders",
    element: <OrderPage />
  },
  {
    path: "profile",
    element: <ProfilePage />
  },
  {
    path: "bd/:name",
    element: <BookDetailPage />
  },
  {
    path: "",
    element: <Navigate to="books" />
  }
]