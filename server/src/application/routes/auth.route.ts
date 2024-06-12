import express from "express";
import { createUserController } from "../controllers/auth.controller";
import { Container } from "../container";

export const router = (container: Container) => {
  const router = express.Router();

  const authController = createUserController(container);

  router.post("/sign-up", authController.signUp);
  router.post("/sign-in", authController.signIn);

  return router;
};
