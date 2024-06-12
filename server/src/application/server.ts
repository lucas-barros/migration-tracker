import path from "path";
import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import * as YAML from "yamljs";
import { router as migrationRouter } from "./routes/migration.route";
import { router as authRouter } from "./routes/auth.route";
import { createContainer } from "./container";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import UserSeeder from "../infrastructure/database/seed/user.seed";

const swaggerDocument = YAML.load(path.join(__dirname, "api-spec.yaml"));

const port = process.env.SERVER_PORT || 8080;

export const createServer = async (dataSource: DataSource) => {
  await dataSource.initialize();

  if (process.env.NODE_ENV !== "production") {
    await runSeeders(dataSource, {
      seeds: [UserSeeder],
    });
  }

  const app = express();
  const container = createContainer(dataSource);

  app.use(cors());
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/migration", migrationRouter(container));
  app.use("/auth", authRouter(container));

  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
