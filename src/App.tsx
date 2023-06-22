import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "css/App.css";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "css/MuiCustom.css"
import { RouterProvider } from "react-router-dom";

import { useReducer } from "react";
import { createBrowserRouter } from "react-router-dom";

import rootRoutes from "routes/root";
import { AppContext, globalReducer, globalState } from "utils/useAppContext";

const queryClient = new QueryClient();

export default function App() {
  // TODO spring security
  const router = createBrowserRouter(rootRoutes);
  const [state, dispatch] = useReducer(globalReducer, globalState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}
