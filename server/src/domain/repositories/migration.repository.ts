import { DataSource, Repository } from "typeorm";
import { Migration } from "../../infrastructure/database/model/Migration";

export type MigrationRepository = Repository<Migration>;

export const createMigrationRepository = (dataSource: DataSource) =>
  dataSource.getRepository(Migration);
