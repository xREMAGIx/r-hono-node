import {
  chunkFileParamsSchema,
  downloadFileParamsSchema,
  generateDownloadFileParamsSchema,
  mergeFileParamsSchema,
} from "@/schemas/common/file/schemas";
import * as fileService from "@/services/common/file/file.service";
import { Handler } from "hono";
import { stream } from "hono/streaming";
import { StatusCode } from "hono/utils/http-status";
import httpStatus from "http-status";

export const handleChunk: Handler = async (c) => {
  const bodyParse = await c.req.parseBody();
  const { fileUuid, fileIndex, file } = chunkFileParamsSchema.parse(bodyParse);

  if (!(file instanceof File)) {
    return;
  }

  await fileService.storeChunkFile({ fileUuid, fileIndex, file });

  return c.json(
    {
      success: true,
    },
    httpStatus.OK as StatusCode,
  );
};

export const handleMerge: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const params = mergeFileParamsSchema.parse(bodyParse);

  await fileService.mergeChunkFile(params);

  return c.json(
    {
      success: true,
    },
    httpStatus.OK as StatusCode,
  );
};

export const handleGenerateDownloadFile: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const params = generateDownloadFileParamsSchema.parse(bodyParse);

  const downloadSid = await fileService.generateDownloadSession(params);

  return c.json(
    {
      sid: downloadSid,
    },
    httpStatus.OK as StatusCode,
  );
};

export const handleDownloadFile: Handler = async (c) => {
  const queryParse = c.req.query();
  const query = downloadFileParamsSchema.parse(queryParse);

  const { stats, data, fileName, mimetype } =
    await fileService.generateStreamFile(query);

  return stream(c, async (stream) => {
    // Write a process to be executed when aborted.
    stream.onAbort(() => {
      console.log("Aborted!");
    });
    // Set header
    if (mimetype) {
      c.header("content-type", mimetype);
    }
    c.header("content-disposition", `attachment; filename=${fileName}`);
    c.header("content-length", stats.size + "");
    // Pipe a readable stream.
    await stream.pipe(data);

    await fileService.clearDownloadSession(query);
  });
};
