import React from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./Providers/UserProvider";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
