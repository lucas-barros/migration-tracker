import { Err, Ok, Result } from "ts-results-es";
import { Migration } from "../entities/migration.entity";
import { MigrationException } from "../exceptions/migration.exception";
import { Container } from "../../application/container";
import { CreateMigrationPayload } from "../../application/dtos/migration.dto";

export interface MigrationUseCase {
  create: (
    payload: CreateMigrationPayload,
  ) => Promise<Result<Migration, MigrationException>>;
  getById: (id: number) => Promise<Result<Migration, MigrationException>>;
  getAll: () => Promise<Result<Migration[], MigrationException>>;
}

export const createMigrationUseCase = ({
  migrationRepository,
}: Container): MigrationUseCase => {
  return {
    create: async ({ date, location, species }) => {
      const migration = new Migration({ date, location, species });

      const result = await migrationRepository.save(migration.toPersistence());
      migration.setId(result.id);

      return new Ok(migration);
    },
    getById: async (id: number) => {
      if (!id) {
        return new Err(MigrationException.InvalidData);
      }

      const migrationModel = await migrationRepository.findOneBy({ id });

      if (migrationModel === null) {
        return new Err(MigrationException.NotFound);
      }

      const migration = Migration.fromPersistence(migrationModel);

      return new Ok(migration);
    },
    getAll: async () => {
      const migrationModels = await migrationRepository.findBy({});
      const migrations = [];

      for (const migrationModel of migrationModels) {
        const migration = Migration.fromPersistence(migrationModel);
        migrations.push(migration);
      }

      return new Ok(migrations);
    },
  };
};
