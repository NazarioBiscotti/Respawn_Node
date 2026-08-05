import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import "./index.css";
import { GameProvider } from "./context/GameContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
        <QueryClientProvider client={queryClient}>

    <AuthProvider>


    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>

    </AuthProvider>

        </QueryClientProvider>
  </StrictMode>
);