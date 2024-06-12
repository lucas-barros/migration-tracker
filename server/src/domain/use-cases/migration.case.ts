import { Err, Ok, Result } from "ts-results-es";
import { Migration, MigrationJson } from "../entities/migration.entity";
import { MigrationException } from "../exceptions/migration.exception";
import { Container } from "../../application/container";
import { CreateMigrationPayload } from "../../application/dtos/migration.dto";

export interface MigrationUseCase {
  create: (
    payload: CreateMigrationPayload,
  ) => Promise<Result<MigrationJson, MigrationException>>;
  getById: (id: number) => Promise<Result<MigrationJson, MigrationException>>;
  getAll: () => Promise<Result<MigrationJson[], MigrationException>>;
}

export const createMigrationUseCase = ({
  migrationRepository,
}: Container): MigrationUseCase => {
  return {
    create: async ({ date, location, species }) => {
      const migration = new Migration({ date, location, species });

      const result = await migrationRepository.save(migration.toJson());

      return new Ok(result);
    },
    getById: async (id: number) => {
      if (!id) {
        return new Err(MigrationException.InvalidData);
      }

      const migrationModel = await migrationRepository.findOneBy({ id });

      if (migrationModel === null) {
        return new Err(MigrationException.NotFound);
      }

      const migration = new Migration(migrationModel);

      return new Ok(migration.toJson());
    },
    getAll: async () => {
      const migrationModels = await migrationRepository.findBy({});
      const migrations = [];

      for (const migrationModel of migrationModels) {
        const migration = new Migration(migrationModel);

        migrations.push(migration.toJson());
      }

      return new Ok(migrations);
    },
  };
};
