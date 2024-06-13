import { Err, Ok, Result } from "ts-results-es";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { User } from "../../infrastructure/database/model/User";

export enum UserRepositoryException {
  DuplicatedEmail = "Email is already in use",
  UnknownError = "Error",
}

export type UserRepository = Repository<User> & {
  saveOne: (
    entity: DeepPartial<User>,
  ) => Promise<Result<User, UserRepositoryException>>;
};

export const createUserRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User).extend({
    async handleErrors(
      method: () => Promise<User>,
    ): Promise<Result<User, UserRepositoryException>> {
      try {
        const result = await method();
        return Ok(result);
      } catch (error) {
        console.error(error);
        if (
          error !== null &&
          typeof error === "object" &&
          "code" in error &&
          error.code === "23505"
        ) {
          return Err(UserRepositoryException.DuplicatedEmail);
        }
        return Err(UserRepositoryException.UnknownError);
      }
    },
    async saveOne(
      entity: DeepPartial<User>,
    ): Promise<Result<User, UserRepositoryException>> {
      return this.handleErrors(() => this.save(entity));
    },
  });
