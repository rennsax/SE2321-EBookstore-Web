import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "css/App.css";
import { RouterProvider } from "react-router-dom";

import { useReducer, useState } from "react";
import { createBrowserRouter } from "react-router-dom";

import rootRoutes from "routes/root";
import {
  AppContext,
  AppLabContext,
  globalReducer,
  globalState,
} from "utils/appContext";
const queryClient = new QueryClient();

export default function App() {
  // TODO spring security
  const [authInfo, setAuthInfo] = useState({
    authed: false,
    account: "",
  });

  const router = createBrowserRouter(rootRoutes);
  const [showPleaseLogin, setShowPleaseLogin] = useState<boolean>(false);
  const [state, dispatch] = useReducer(globalReducer, globalState);

  const appContext: AppContextType = {
    authInfo,
    setAuthInfo,
    showPleaseLogin,
    setShowPleaseLogin,
  };

  return (
    <AppLabContext.Provider value={[state, dispatch]}>
      <AppContext.Provider value={appContext}>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppContext.Provider>
    </AppLabContext.Provider>
  );
}
