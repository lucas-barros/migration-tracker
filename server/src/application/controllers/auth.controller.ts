import { Request, Response } from "express";
import { SignInPayload, SignUpPayload, UserResponse } from "../dtos/user.dto";
import { Container } from "../container";
import { createAuthUseCase } from "../../domain/use-cases/auth.case";

export interface AuthController {
  signUp(
    req: Request<unknown, unknown, SignUpPayload>,
    res: Response<UserResponse>,
  ): Promise<void>;
  signIn(
    req: Request<SignInPayload>,
    res: Response<UserResponse>,
  ): Promise<void>;
}

export const createUserController = ({
  hashService,
  authTokenService,
  userRepository,
}: Container): AuthController => {
  const authUseCase = createAuthUseCase({
    hashService,
    userRepository,
    authTokenService,
  });
  return {
    signUp: async (req, res) => {
      const { email, password, name, location, role } = req.body;

      const result = await authUseCase.signUp({
        email,
        password,
        name,
        location,
        role,
      });

      if (result.isErr()) {
        res.status(400).send({ error: result.error });
        return;
      }

      const user = result.value;

      res.status(201).send({ ...user.toJson(), token: user.getToken() });
    },
    signIn: async (req, res) => {
      const { email, password } = req.body;

      const result = await authUseCase.signIn({ email, password });

      if (result.isErr()) {
        res.status(400).send({ error: result.error });
        return;
      }
      const user = result.value;

      res.status(200).send({ ...user.toJson(), token: user.getToken() });
    },
  };
};
