import { Env, Hono, Schema } from "hono";

//! Don't delete comment below, it's used for hygen generator
//* Import route
import { route as simpleTodoRoute } from "@/routes/v1/simpleTodo.route";
import { route as authRoute } from "@/routes/v1/auth.route";
import { route as productRoute } from "@/routes/v1/product.route";

const BASE_PATH = "api/v1";

interface RouteType {
  path: string;
  route: Hono<Env, Schema, string>;
}

export const apiRoutes = [
  {
    path: `/${BASE_PATH}/simple-todo`,
    route: simpleTodoRoute,
  },
  {
    path: `/${BASE_PATH}/auth`,
    route: authRoute,
  },
  {
    path: `/${BASE_PATH}/product`,
    route: productRoute,
  },
] as RouteType[];
