export interface ChunkImageParams {
  fileUuid: number;
  fileIndex: number;
  /**
   *
   * @schema z.instanceof(File).or(z.string()).openapi({type: "array",items: { type: "string", format: "binary"}})
   */
  file: File;
}
