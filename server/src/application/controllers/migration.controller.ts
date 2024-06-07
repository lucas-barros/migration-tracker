import { Request, Response } from "express";
import { MigrationUseCase } from "../../domain/use-cases/migration.case";
import { MigrationException } from "../../domain/exceptions/migration.exception";
import {
  CreateMigrationPayload,
  MigrationParams,
  MigrationResponse,
  MigrationsResponse,
} from "../dtos/migration.dto";

const INTERNAL_ERROR = "Internal server error";

export interface MigrationController {
  create(
    req: Request<unknown, unknown, CreateMigrationPayload>,
    res: Response<MigrationResponse>,
  ): Promise<void>;
  getById(
    req: Request<MigrationParams>,
    res: Response<MigrationResponse>,
  ): Promise<void>;
  getAll(req: Request, res: Response<MigrationsResponse>): Promise<void>;
}

export const createMigrationController = (
  useCase: MigrationUseCase,
): MigrationController => {
  return {
    create: async (req, res) => {
      const { date, location, species } = req.body;
      const result = await useCase.create({ date, location, species });

      if (result.isOk()) {
        res.status(201).send(result.value);
        return;
      }
      if (result.error === MigrationException.InvalidData) {
        res.status(400).send({ error: result.error });
        return;
      }
      res.status(500).send({ error: INTERNAL_ERROR });
    },
    getById: async (req, res) => {
      const migrationId = Number(req.params.id);
      const result = await useCase.getById(migrationId);

      if (result.isOk()) {
        res.status(200).send(result.value);
        return;
      }
      if (result.error === MigrationException.NotFound) {
        res.status(404).send({ error: result.error });
        return;
      }
      if (result.error === MigrationException.InvalidData) {
        res.status(400).send({ error: result.error });
        return;
      }
      res.status(500).send({ error: INTERNAL_ERROR });
    },
    getAll: async (req, res) => {
      const result = await useCase.getAll();

      if (result.isOk()) {
        res.status(200).send(result.value);
        return;
      }

      res.status(500).send({ error: INTERNAL_ERROR });
    },
  };
};
