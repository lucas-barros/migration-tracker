import { DataSource, Repository } from "typeorm";
import { User } from "../../infrastructure/database/model/User";

export type UserRepository = Repository<User>;

export const createUserRepository = (dataSource: DataSource) =>
  dataSource.getRepository(User);
