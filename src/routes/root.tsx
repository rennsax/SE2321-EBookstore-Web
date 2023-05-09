import RequireAuthorized from "components/RequireAuthorized";
import { Navigate } from "react-router-dom";
import homePageElement from "routes/main";
import HomePage from "view/HomePage";
import LoginPageLab from "view/LoginPage";

export default [
  {
    path: "/login",
    element: <LoginPageLab />,
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
