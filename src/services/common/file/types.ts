export interface ChunkFileParams {
  fileUuid: string;
  /**
   *
   * @coerce
   */
  fileIndex: number;
  /**
   *
   * @schema z.instanceof(File).or(z.string()).openapi({ type: "string", format: "binary" })
   */
  file: any;
}

export interface ChunkFileData {
  success: boolean;
}

export interface MergeFileParams {
  fileUuid: string;
  fileName: string;
}

export interface MergeFileData {
  success: boolean;
}

export interface GenerateDownloadFileParams {
  name: string;
}

export interface GenerateDownloadFileData {
  sid: string;
}

export interface DownloadFileParams {
  sid: string;
}

export interface DownloadFileData {
  /**
   *
   * @schema z.any().openapi({type: "object", format: "binary"})
   */
  data: any;
}
