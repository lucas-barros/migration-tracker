import { createServer } from "./src/application/server";
import {
  createDataSource,
  dataSourceOptions,
} from "./src/infrastructure/database/data-source";

const env = process.env.NODE_ENV || "development";

createServer(createDataSource(dataSourceOptions[env]));
