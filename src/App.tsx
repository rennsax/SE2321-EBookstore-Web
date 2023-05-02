import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "css/App.css";
import { RouterProvider } from "react-router-dom";

import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";

import rootRoutes from "routes/root";
import { AuthContext } from "utils/auth";
const queryClient = new QueryClient();

export default function App() {
  // TODO spring security
  const [auth, setAuth] = useState({
    authed: false,
    account: "",
  });
  const router = createBrowserRouter(rootRoutes);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
