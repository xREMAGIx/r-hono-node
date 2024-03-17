---
to: src/routes/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>.route.ts
---
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

import * as <%= h.changeCase.camel(name) %>Controller from "@/controllers/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>.controller";
import {
  fn<%= h.changeCase.pascal(name) %>DataSchema,
} from "@/schemas/<%= h.changeCase.lower(mainFolder) %>/<%= h.changeCase.camel(name) %>/schemas";

export const route = new OpenAPIHono();

const fnRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    query: fn<%= h.changeCase.pascal(name) %>ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: fn<%= h.changeCase.pascal(name) %>DataSchema,
        },
      },
      description: "Function",
    },
  },
  tags: ["Function"],
});

route.openapi(fnRoute, <%= h.changeCase.camel(name) %>Controller.fn<%= h.changeCase.pascal(name) %>Handler);
