import { DataSource } from "typeorm";
import {
  createMigrationRepository,
  MigrationRepository,
} from "../domain/repositories/migration.repository";
import {
  createUserRepository,
  UserRepository,
} from "../domain/repositories/user.repository";
import { HashService } from "./services/hash.service";
import { AuthTokenService } from "./services/auth-token.service";
import { config } from "./config";

export interface Container {
  migrationRepository: MigrationRepository;
  userRepository: UserRepository;
  hashService: HashService;
  authTokenService: AuthTokenService;
}

export const createContainer = (dataSource: DataSource): Container => {
  return {
    hashService: new HashService(),
    authTokenService: new AuthTokenService(config.jwtSecret),
    migrationRepository: createMigrationRepository(dataSource),
    userRepository: createUserRepository(dataSource),
  };
};
