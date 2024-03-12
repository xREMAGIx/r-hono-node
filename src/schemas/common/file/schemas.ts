// Generated by ts-to-zod
import { z } from "zod";

export const chunkFileParamsSchema = z.object({
  fileUuid: z.string(),
  fileIndex: z.coerce.number(),
  file: z
    .instanceof(File)
    .or(z.string())
    .openapi({ type: "string", format: "binary" }),
});

export const chunkFileDataSchema = z.object({
  success: z.boolean(),
});

export const mergeFileParamsSchema = z.object({
  fileUuid: z.string(),
  fileName: z.string(),
});

export const mergeFileDataSchema = z.object({
  success: z.boolean(),
});

export const generateDownloadFileParamsSchema = z.object({
  name: z.string(),
});

export const generateDownloadFileDataSchema = z.object({
  sid: z.string(),
});

export const downloadFileParamsSchema = z.object({
  sid: z.string(),
});

export const downloadFileDataSchema = z.object({
  data: z.any().openapi({ type: "object", format: "binary" }),
});