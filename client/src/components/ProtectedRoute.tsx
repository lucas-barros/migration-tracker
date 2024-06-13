import React, { PropsWithChildren } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LogoutPopover } from "./logout/Logout";
import { Box } from "@radix-ui/themes";
import { routes } from "../routes";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate(routes.root);
  };

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box position="relative">
      <Box position="absolute" left="4" bottom="4">
        <LogoutPopover onLogOut={onLogOut} />
      </Box>
      {children}
    </Box>
  );
};
