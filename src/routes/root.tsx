import { Navigate } from "react-router-dom";
import RequireAuthorized from "components/RequireAuthorized";
import HomePage from "view/HomePage";
import LoginPage from "view/LoginPage";
import homePageElement from "routes/main";

export default [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <RequireAuthorized>
        <HomePage />
      </RequireAuthorized>
    ),
    children: homePageElement,
  },
  // TODO do it on your server (probably the best solution)
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
];
