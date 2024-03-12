import { Env, Hono, Schema } from "hono";

import { route as fileRoute } from "@/routes/common/file.route";

const BASE_PATH = "api";

interface RouteType {
  path: string;
  route: Hono<Env, Schema, string>;
}

export const commonApiRoutes: RouteType[] = [
  {
    path: `/${BASE_PATH}/file`,
    route: fileRoute,
  },
];
