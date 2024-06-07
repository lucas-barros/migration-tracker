import { DataSource } from "typeorm";
import {
  createMigrationRepository,
  MigrationRepository,
} from "./repositories/migration.repository";
import {
  createUserRepository,
  UserRepository,
} from "./repositories/user.repository";

export interface Container {
  migrationRepository: MigrationRepository;
  userRepository: UserRepository;
}

export const createContainer = (dataSource: DataSource): Container => {
  return {
    migrationRepository: createMigrationRepository(dataSource),
    userRepository: createUserRepository(dataSource),
  };
};
