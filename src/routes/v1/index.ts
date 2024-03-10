import { Env, Hono, Schema } from "hono";

import { route as authRoute } from "@/routes/v1/auth.route";
import { route as productRoute } from "@/routes/v1/product.route";

const BASE_PATH = "api/v1";

interface RouteType {
  path: string;
  route: Hono<Env, Schema, string>;
}

export const apiRoutes: RouteType[] = [
  {
    path: `/${BASE_PATH}/auth`,
    route: authRoute,
  },
  {
    path: `/${BASE_PATH}/product`,
    route: productRoute,
  },
];
