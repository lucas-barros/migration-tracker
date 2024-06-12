import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
