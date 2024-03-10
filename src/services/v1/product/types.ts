import { QueryPaginationData, QueryPaginationOptions } from "../../general";

//* Data
export interface ProductData {
  id: number;
  name: string | null;
  desc: string;
}

//* List
export interface GetProductsFilter {
  name?: string;
}

export interface GetProductsParams
  extends GetProductsFilter,
    QueryPaginationOptions {}

export interface GetProductsData {
  data: Array<ProductData>;
  meta: QueryPaginationData;
}

//* Detail
export interface GetProductParams {
  /**
   * Id.
   *
   * @coerce
   */
  id: number;
}

export interface GetProductData {
  data: ProductData;
}

//* Update
export interface UpdateProductParams {
  /**
   * Id.
   *
   * @coerce
   */
  id: number;
  name?: string;
  desc?: string;
}

export interface UpdateProductData {
  data: ProductData;
}

//* Delete
export interface DeleteProductParams {
  /**
   * Id.
   *
   * @coerce
   */
  id: number;
}

export interface DeleteProductData {
  data: {
    /**
     * Id.
     *
     * @coerce
     */
    id: number;
  };
}
