import "dotenv/config";
import joi from "joi";

const envVarsSchema = joi
  .object({
    JWT_SECRET: joi.string().required(),
    NODE_ENV: joi
      .string()
      .valid("production", "development", "test")
      .default("development")
      .required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: {
  jwtSecret: string;
  nodeEnv: "production" | "development" | "test";
} = {
  jwtSecret: envVars.JWT_SECRET,
  nodeEnv: envVars.NODE_ENV,
};
