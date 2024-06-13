import { Request, Response, NextFunction } from "express";
import { Container } from "../container";

export const FAILED_AUTHENTICATION = "Failed Authentication";

export const createAuthenticationMiddleware =
  ({ userRepository, authTokenService }: Container) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (token === undefined) {
      return res.status(401).json({ error: FAILED_AUTHENTICATION });
    }

    const authResult = authTokenService.verify(token);
    if (authResult.isErr()) {
      res.status(401).json({ error: authResult.error });
      return;
    }

    const result = await userRepository.findOneBy({
      id: authResult.value.userId,
    });

    if (!result) {
      res.status(404).json({ error: "No user" });
      return;
    }

    res.locals.userId = result.id;
    res.locals.role = result.role;
    next();
  };
