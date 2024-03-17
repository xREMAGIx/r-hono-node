import { getDBClient } from "@/config/database";
import { SimpleTodo } from "@/models/v1/simpleTodo.model";
import { QueryPaginationData } from "@/services/general";
import { OrderByDirectionExpression, sql } from "kysely";
import { CreateSimpleTodoParams, GetSimpleTodoListParams } from "./types";

export const getSimpleTodoList = async (
  params: GetSimpleTodoListParams,
): Promise<{
  data: SimpleTodo[];
  meta: QueryPaginationData;
}> => {
  const db = getDBClient();
  const { sortBy = "asc", limit = 10, page = 1 } = params;

  //* Process
  let query = db
    .selectFrom("simple_todo")
    .selectAll()
    .orderBy(`created_at`, sortBy as OrderByDirectionExpression)
    .limit(limit)
    .offset(limit * (page - 1));

  const result = await query.execute();

  //TODO: Find effective way for get total
  //maybe ref https://stackoverflow.com/questions/7943233/fast-way-to-discover-the-row-count-of-a-table-in-postgresql
  const totalQueryResult = await sql<{ total: string }>`
    SELECT count(*) as total FROM simple_todo;
  `.execute(db);

  const total = Number(totalQueryResult.rows[0]?.total);
  const totalPages = Math.ceil(total / limit);

  //* Response
  return {
    data: result.map(
      (ele) =>
        new SimpleTodo({
          id: ele.id,
          name: ele.name || "",
          isCompleted: ele.is_completed || false,
          createdAt: ele.created_at,
          updatedAt: ele.updated_at,
        }),
    ),
    meta: {
      limit: limit,
      page: page,
      total: total,
      totalPages: totalPages,
    },
  };
};

export const createSimpleTodo = async (
  params: CreateSimpleTodoParams,
): Promise<SimpleTodo> => {
  const db = getDBClient();
  const { name } = params;

  //* Process
  let insert = db
    .insertInto("simple_todo")
    .values({
      name: name,
    })
    .returningAll();
  const result = await insert.executeTakeFirstOrThrow();

  return new SimpleTodo({
    id: result.id,
    name: result.name || "",
    isCompleted: result.is_completed || false,
    createdAt: result.created_at,
    updatedAt: result.updated_at,
  });
};
