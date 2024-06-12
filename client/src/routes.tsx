import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthPage } from "./pages/Auth";
import { CreateMigration } from "./components/CreateMigration";

export const routes = {
  root: "/",
  signIn: "/sign-in",
  user: "/user",
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
    path: routes.user,
    element: (
      <ProtectedRoute>
        <></>
      </ProtectedRoute>
    ),
  },
  {
    path: routes.biologist,
    element: (
      <ProtectedRoute>
        <CreateMigration />
      </ProtectedRoute>
    ),
  },
]);
