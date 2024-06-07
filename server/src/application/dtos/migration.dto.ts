import { MigrationJson } from "../../domain/entities/migration.entity";

export interface Error {
  error: string;
}
export interface CreateMigrationPayload {
  species: string;
  date: string;
  location: string;
}

export interface MigrationParams {
  id: string;
}

export type MigrationResponse = MigrationJson | Error;

export type MigrationsResponse = MigrationJson[] | Error;
