import {
  createSimpleTodoParamsSchema,
  getSimpleTodoListParamsSchema,
} from "@/schemas/v1/simpleTodo/schemas";
import * as simpleTodoService from "@/services/v1/simpleTodo/simpleTodo.service";
import { Handler } from "hono";
import type { StatusCode } from "hono/utils/http-status";
import httpStatus from "http-status";

export const getSimpleTodoListHandler: Handler = async (c) => {
  //* Queries, params, request body
  const queryParse = c.req.query();

  //* Parse
  const query = getSimpleTodoListParamsSchema.parse(queryParse);

  //* Services
  const result = await simpleTodoService.getSimpleTodoList(query);

  //* Response
  return c.json(
    {
      ...result,
    },
    httpStatus.OK as StatusCode,
  );
};

export const createSimpleTodoHandler: Handler = async (c) => {
  //* Queries, params, request body
  const bodyParse = c.req.json();

  //* Parse
  const param = createSimpleTodoParamsSchema.parse(bodyParse);

  //* Services
  const result = await simpleTodoService.createSimpleTodo(param);

  //* Response
  return c.json(
    {
      data: result,
    },
    httpStatus.OK as StatusCode,
  );
};
