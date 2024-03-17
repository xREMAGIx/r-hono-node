import { QueryPaginationData, QueryPaginationOptions } from "../../general";

//* Data
export interface SimpleTodoData {
  id: number;
  name: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

//* List
export interface GetSimpleTodoListParams extends QueryPaginationOptions {}

export interface GetSimpleTodoListData {
  data: Array<SimpleTodoData>;
  meta: QueryPaginationData;
}

//* Detail
export interface GetSimpleTodoDetailParams {
  /**
   * Id.
   *
   * @coerce
   */
  id: number;
}

export interface GetSimpleTodoDetailData {
  data: SimpleTodoData;
}

//* Create
export interface CreateSimpleTodoParams {
  name: string;
}

export interface CreateSimpleTodoData {
  data: SimpleTodoData;
}

//* Update
export interface UpdateSimpleTodoParams {
  /**
   * Id.
   *
   * @coerce
   */
  id: number;
  name?: string;
}

export interface UpdateSimpleTodoData {
  data: SimpleTodoData;
}

//* Delete
export interface DeleteSimpleTodoParams {
  /**
   * Id.
   *
   * @coerce
   */
  id: number;
}

export interface DeleteSimpleTodoData {
  data: {
    /**
     * Id.
     *
     * @coerce
     */
    id: number;
  };
}
