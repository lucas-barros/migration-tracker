import { Request, Response, NextFunction } from "express";
import { Role } from "../../domain/entities/user.entity";

export const FAILED_AUTHORIZATION = "Failed Authorization";

export const authorizationMiddleware = {
  canCreateMigration(_: Request, res: Response, next: NextFunction) {
    if (res.locals.role !== Role.Biologist) {
      res.status(401).json({ error: FAILED_AUTHORIZATION });
      return;
    }

    next();
  },
};
