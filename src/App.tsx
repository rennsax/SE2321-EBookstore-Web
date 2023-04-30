import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "css/App.css";
import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import { createContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const AccountContext = createContext<string>("");

import HomePage from "view/HomePage";

import homePageElement from "routes/main";
import LoginPage from "view/LoginPage";
const queryClient = new QueryClient();

function App() {
  // TODO To persist the login status
  const [account, setAccount] = useState<string>("cauchy@gmail.com");

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage setAccount={setAccount} />,
    },
    {
      path: "/home/*",
      element: <HomePage account={account} />,
      children: homePageElement,
    },
    // TODO do it on your server (probably the best solution)
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
