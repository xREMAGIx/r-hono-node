// Generated by ts-to-zod
import { z } from "zod";

export const getUserByUsernameParamsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const getUserByIdParamsSchema = z.object({
  id: z.coerce.number(),
});

const roleSchema = z.any();

export const userDataSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  role: roleSchema,
});
