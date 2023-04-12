import "css/App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";

import router from "routes/root";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
