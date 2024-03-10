import * as authController from "@/controllers/v1/auth.controller";
import { chunkImageParamsSchema } from "@/documentation/common/image/schema";
import { loginDataSchema } from "@/documentation/v1/auth/schema";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

export const route = new OpenAPIHono();

const chunkRoute = createRoute({
  method: "post",
  path: "/chunk",
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: chunkImageParamsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: loginDataSchema,
        },
      },
      description: "Login",
    },
  },
  tags: ["Common"],
});

route.openapi(chunkRoute, authController.login);
