import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

import * as simpleTodoController from "@/controllers/v1/simpleTodo.controller";
import {
  createSimpleTodoDataSchema,
  createSimpleTodoParamsSchema,
  getSimpleTodoListDataSchema,
  getSimpleTodoListParamsSchema,
} from "@/schemas/v1/simpleTodo/schemas";

export const route = new OpenAPIHono();

const getSimpleTodoListRoute = createRoute({
  summary: "Get SimpleTodo List",
  method: "get",
  path: "/",
  request: {
    query: getSimpleTodoListParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: getSimpleTodoListDataSchema,
        },
      },
      description: "Get List Simple Todo",
    },
  },
  tags: ["SimpleTodo"],
});

const createSimpleTodoRoute = createRoute({
  summary: "Create SimpleTodo",
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createSimpleTodoParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: createSimpleTodoDataSchema,
        },
      },
      description: "Login",
    },
  },
  tags: ["SimpleTodo"],
});

route.openapi(
  getSimpleTodoListRoute,
  simpleTodoController.getSimpleTodoListHandler,
);

route.openapi(
  createSimpleTodoRoute,
  simpleTodoController.createSimpleTodoHandler,
);
