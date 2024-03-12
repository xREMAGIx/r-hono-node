import * as fileController from "@/controllers/common/file.controller";
import {
  chunkFileDataSchema,
  chunkFileParamsSchema,
  downloadFileDataSchema,
  downloadFileParamsSchema,
  generateDownloadFileDataSchema,
  generateDownloadFileParamsSchema,
  mergeFileDataSchema,
  mergeFileParamsSchema,
} from "@/schemas/common/file/schemas";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

export const route = new OpenAPIHono();

const chunkRoute = createRoute({
  summary: "Upload chunk file",
  method: "post",
  path: "/chunk",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: chunkFileParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: chunkFileDataSchema,
        },
      },
      description: "Parts upload",
    },
  },
  tags: ["Common"],
});

const mergeRoute = createRoute({
  summary: "Merge chunk file",
  method: "post",
  path: "/merge",
  request: {
    body: {
      content: {
        "application/json": {
          schema: mergeFileParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: mergeFileDataSchema,
        },
      },
      description: "Merge parts",
    },
  },
  tags: ["Common"],
});

const generateDownloadFileRoute = createRoute({
  summary: "Generate download file link",
  method: "post",
  path: "/generate-download-file",
  request: {
    body: {
      content: {
        "application/json": {
          schema: generateDownloadFileParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: generateDownloadFileDataSchema,
        },
      },
      description: "Download file params",
    },
  },
  tags: ["Common"],
});

const downloadFileRoute = createRoute({
  summary: "Download file",
  method: "get",
  path: "/download-file",
  request: {
    query: downloadFileParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/octet-stream": {
          schema: downloadFileDataSchema,
        },
      },
      description: "File download",
    },
  },
  tags: ["Common"],
});

route.openapi(chunkRoute, fileController.handleChunk);
route.openapi(mergeRoute, fileController.handleMerge);
route.openapi(
  generateDownloadFileRoute,
  fileController.handleGenerateDownloadFile,
);
route.openapi(downloadFileRoute, fileController.handleDownloadFile);
