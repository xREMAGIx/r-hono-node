import { ApiError } from "@/middlewares/apiError";
import {
  createDownloadSession,
  deleteDownloadSession,
  getDownloadFilePath,
  getFiles,
} from "@/utils/custom-fs";
import { streamFile } from "@/utils/stream";
import httpStatus from "http-status";
import mime from "mime";
import { Stats, promises, readFileSync } from "node:fs";
import path from "node:path";
import { ReadableStream } from "node:stream/web";
import {
  ChunkFileParams,
  DownloadFileParams,
  GenerateDownloadFileParams,
  MergeFileParams,
} from "./types";

export const storeChunkFile = async (
  params: ChunkFileParams,
): Promise<void> => {
  const { fileUuid, fileIndex } = params;
  const file = params.file as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const configFilePath = path.join(
      process.cwd(),
      `tmp/chunk/${fileUuid}/${fileUuid}_${fileIndex}.chunk`,
    );
    await promises.mkdir(path.dirname(configFilePath), { recursive: true });
    await promises.writeFile(configFilePath, buffer);
  } catch (errors) {
    const error = errors as Error;
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const mergeChunkFile = async (
  params: MergeFileParams,
): Promise<void> => {
  const { fileUuid, fileName } = params;

  try {
    const folderPath = path.join(process.cwd(), `tmp/chunk/${fileUuid}/`);
    const desFolderPath = path.join(process.cwd(), `public/upload/`);
    const chunkFiles = await getFiles(folderPath);

    let bufferArr: Uint8Array[] = [];

    chunkFiles.forEach((file) => {
      let currentFileBuffer = readFileSync(file);
      bufferArr.push(currentFileBuffer);
    });
    let bufferConcat = Buffer.concat(bufferArr);
    await promises.mkdir(path.dirname(desFolderPath + `${fileName}`), {
      recursive: true,
    });
    await promises.writeFile(desFolderPath + `${fileName}`, bufferConcat);
    await promises.rm(folderPath, { recursive: true });
  } catch (errors) {
    const error = errors as Error;
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const generateDownloadSession = async (
  params: GenerateDownloadFileParams,
): Promise<string> => {
  const { name } = params;

  const filePath = path.resolve(`static/${name}`);

  return await createDownloadSession(filePath);
};

export const generateStreamFile = async (
  params: DownloadFileParams,
): Promise<{
  stats: Stats;
  data: ReadableStream<Uint8Array>;
  fileName: string;
  mimetype: string | null;
}> => {
  const { sid } = params;
  const file = await getDownloadFilePath(sid);

  const stats = await promises.stat(file);

  const data: ReadableStream<Uint8Array> = streamFile(file); //Stream the file with a 1kb chunk

  var mimetype = mime.getType(file);

  return {
    stats,
    data,
    fileName: path.basename(file),
    mimetype,
  };
};

export const clearDownloadSession = async (
  params: DownloadFileParams,
): Promise<void> => {
  const { sid } = params;
  await deleteDownloadSession(sid);
};
