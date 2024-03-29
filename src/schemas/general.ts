// Generated by ts-to-zod
import { z } from "zod";

export const queryPaginationOptionsSchema = z.object({
  sortBy: z.string().optional().default("asc"),
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1),
});

export const queryPaginationDataSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});
