import RequireAuthorized from "components/RequireAuthorized";
import { Navigate, RouteObject } from "react-router-dom";
import mainRoutes from "routes/main";
import AdminHomePage from "view/Admin/HomePage";
import HomePage from "view/HomePage";
import LoginPage from "view/LoginPage";
import adminRoutes from "./admin";

const routeObjectList: RouteObject[] = [
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
    children: mainRoutes,
  },
  {
    path: "/admin",
    element: (
      <RequireAuthorized super>
        <AdminHomePage />
      </RequireAuthorized>
    ),
    children: adminRoutes
  },
  // TODO do it on your server (probably the best solution)
  {
    path: "/",
    element: <Navigate to="/login" replace/>,
  },
];

export default routeObjectList;