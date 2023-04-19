import { createBrowserRouter, Navigate } from "react-router-dom";

import HomePage from "view/HomePage";
import LoginPage from "view/LoginPage";

import homePageElement from "./main";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home/*",
    element: <HomePage />,
    children: homePageElement,
  },
  // TODO do it on your server (probably the best solution)
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
]);

export default router;
