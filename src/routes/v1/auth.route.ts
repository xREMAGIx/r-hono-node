import * as authController from "@/controllers/v1/auth.controller";
import {
  loginDataSchema,
  loginParamsSchema,
  profileDataSchema,
} from "@/documentation/v1/auth/schema";
import { auth } from "@/middlewares/auth";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";

export const route = new OpenAPIHono();

const loginRoute = createRoute({
  method: "post",
  path: "/login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginParamsSchema,
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
  tags: ["Auth"],
});

const profileRoute = createRoute({
  method: "get",
  path: "/profile",
  security: [
    {
      AuthorizationBearer: [],
    },
  ],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: profileDataSchema,
        },
      },
      description: "Profile",
    },
  },
  tags: ["Auth"],
});

route.openapi(loginRoute, authController.login);
route.use(profileRoute.getRoutingPath(), auth());
route.openapi(profileRoute, authController.getProfile);
