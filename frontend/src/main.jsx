import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.jsx";
import "./index.css";
import { GameProvider } from "./context/GameContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>


    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>

    </AuthProvider>
  </StrictMode>
);