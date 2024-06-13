import express from "express";

import { authorizationMiddleware } from "../middlewares/authorization";
import { Container } from "../container";
import { createMigrationController } from "../controllers/migration.controller";
import { createMigrationUseCase } from "../../domain/use-cases/migration.case";
import { MigrationParams } from "../dtos/migration.dto";
import { createAuthenticationMiddleware } from "../middlewares/authentication";

export const router = (container: Container) => {
  const router = express.Router();
  const useCase = createMigrationUseCase(container);
  const migrationController = createMigrationController(useCase);

  router.use(createAuthenticationMiddleware(container));
  router.post(
    "/",
    authorizationMiddleware.canCreateMigration,
    migrationController.create,
  );
  router.get("/", migrationController.getAll);
  router.get<MigrationParams>("/:id", migrationController.getById);

  return router;
};
