import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import dotenv from "dotenv";
import httpStatus from "http-status";
import { ApiError } from "./middlewares/apiError";
import { errorHandler } from "./middlewares/error";
import { commonApiRoutes } from "./routes/common";
import { apiRoutes as v1ApiRoutes } from "./routes/v1";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";

dotenv.config();

const app = new OpenAPIHono();

app.notFound(() => {
  throw new ApiError(httpStatus.NOT_FOUND, "Not found");
});

app.onError(errorHandler);

app.use("/api/*", cors());

for (let i = 0; i < commonApiRoutes.length; i++) {
  app.route(`${commonApiRoutes[i].path}`, commonApiRoutes[i].route);
}

for (let i = 0; i < v1ApiRoutes.length; i++) {
  app.route(`${v1ApiRoutes[i].path}`, v1ApiRoutes[i].route);
}

app.doc("/doc", {
  info: {
    title: "API Documentation",
    version: "v1",
  },
  openapi: "3.1.0",
});

app.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
);

app.get("/documentation", swaggerUI({ url: "/doc" }));

app.use(
  "/public/*",
  serveStatic({
    root: "src",
  }),
);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
