import { Env, Hono, Schema } from "hono";

import { route as imageRoute } from "@/routes/common/image.route";

const BASE_PATH = "api";

interface RouteType {
  path: string;
  route: Hono<Env, Schema, string>;
}

export const commonApiRoutes: RouteType[] = [
  {
    path: `/${BASE_PATH}/image`,
    route: imageRoute,
  },
];
