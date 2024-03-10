export interface QueryPaginationOptions {
  /**
   * Sort by.
   *
   * @default "asc"
   */
  sortBy?: string;
  /**
   * Limit per page.
   *
   * @default 10
   * @coerce
   */
  limit?: number;
  /**
   * Page number.
   *
   * @default 1
   * @coerce
   */
  page?: number;
}

export interface QueryPaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
