import express from "express";

import { authorizationMiddleware } from "../middlewares/authorization";
import { Container } from "../../domain/container";
import { createMigrationController } from "../controllers/migration.controller";
import { createMigrationUseCase } from "../../domain/use-cases/migration.case";
import { MigrationParams } from "../dtos/migration.dto";
import { createAuthenticationMiddleware } from "../middlewares/authentication";

export const router = (container: Container) => {
  const router = express.Router();
  const useCase = createMigrationUseCase(container);
  const migrationController = createMigrationController(useCase);
  const authentication = createAuthenticationMiddleware(
    container.userRepository,
  );

  router.use(authentication.basicAuthMiddleware);
  router.post(
    "/",
    authorizationMiddleware.canCreateMigration,
    migrationController.create,
  );
  router.get("/", migrationController.getAll);
  router.get<MigrationParams>("/:id", migrationController.getById);

  return router;
};
