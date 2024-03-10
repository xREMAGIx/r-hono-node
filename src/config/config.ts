import { ApiError } from "@/middlewares/apiError";
import { generateZodErrorMessage } from "@/middlewares/zodError";
import httpStatus from "http-status";
import { ZodError, z } from "zod";

const envVarsSchema = z.object({
  ENV: z.union([
    z.literal("production"),
    z.literal("development"),
    z.literal("test"),
  ]),
  //* Database
  DATABASE_NAME: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_HOST: z.string(),
  //* JWT secret key
  JWT_SECRET: z.string(),
  //* Minutes after which access tokens expire
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),
  //* Days after which refresh tokens expire
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(30),
  //* Minutes after which reset password token expires
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.coerce.number().default(10),
  //* Minutes after which verify email token expires
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.coerce.number().default(10),
});

export type EnvVarsSchemaType = z.infer<typeof envVarsSchema>;

export interface Config {
  env: "production" | "development" | "test";
  database: {
    name: string;
    username: string;
    password: string;
    host: string;
  };
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
    resetPasswordExpirationMinutes: number;
    verifyEmailExpirationMinutes: number;
  };
}

let config: Config;

export const getConfig = (env: EnvVarsSchemaType) => {
  if (config) {
    return config;
  }
  let envVars: EnvVarsSchemaType;
  try {
    envVars = envVarsSchema.parse(env);
  } catch (err) {
    if (env.ENV && env.ENV === "production") {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Invalid server configuration"
      );
    }
    if (err instanceof ZodError) {
      const errorMessage = generateZodErrorMessage(err);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, errorMessage);
    }
    throw err;
  }
  config = {
    env: envVars.ENV,
    database: {
      name: envVars.DATABASE_NAME,
      username: envVars.DATABASE_USERNAME,
      password: envVars.DATABASE_PASSWORD,
      host: envVars.DATABASE_HOST,
    },
    jwt: {
      secret: envVars.JWT_SECRET,
      accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
      refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
      resetPasswordExpirationMinutes:
        envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
      verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
  };
  return config;
};
