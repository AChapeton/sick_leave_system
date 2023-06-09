import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import "./styles/reset.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Providing query client tool to App */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
