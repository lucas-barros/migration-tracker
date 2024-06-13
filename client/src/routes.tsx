import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthPage } from "./pages/Auth";
import { Biologist } from "./pages/Biologist";
import { Citizen } from "./pages/Citizen";

export const routes = {
  root: "/",
  signIn: "/sign-in",
  citizen: "/citizen",
  biologist: "/biologist",
};

export const router = createBrowserRouter([
  {
    path: routes.root,
    Component: AuthPage,
  },
  {
    path: routes.signIn,
    Component: AuthPage,
  },
  {
    path: routes.citizen,
    element: (
      <ProtectedRoute>
        <Citizen />
      </ProtectedRoute>
    ),
  },
  {
    path: routes.biologist,
    element: (
      <ProtectedRoute>
        <Biologist />
      </ProtectedRoute>
    ),
  },
]);
