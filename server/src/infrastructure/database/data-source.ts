import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { User } from "./model/User";
import { Migration } from "./model/Migration";
import UserSeeder from "./seed/user.seed";

const postgresOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Migration],
  migrations: [],
  subscribers: [],
  seeds: [UserSeeder],
  seedTracking: true,
};

export const dataSourceOptions: Record<
  "production" | "development" | "test",
  DataSourceOptions & SeederOptions
> = {
  test: {
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User, Migration],
    synchronize: true,
    logging: false,
    seeds: [UserSeeder],
  },
  development: postgresOptions,
  production: postgresOptions,
};

export const createDataSource = (options: DataSourceOptions & SeederOptions) =>
  new DataSource(options);
