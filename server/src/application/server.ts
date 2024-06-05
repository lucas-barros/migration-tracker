import express from "express";
import { DataSource } from "typeorm";
import { runSeeders } from "typeorm-extension";
import UserSeeder from "../infrastructure/database/seed/user.seed";

const port = process.env.SERVER_PORT || 8080;

export const createServer = async (dataSource: DataSource) => {
  await dataSource.initialize();

  if (process.env.NODE_ENV !== "production") {
    await runSeeders(dataSource, {
      seeds: [UserSeeder],
    });
  }

  const app = express();

  app.use(express.json());

  return app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
