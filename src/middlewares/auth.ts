import { getConfig } from "@/config/config";
import { Permission, Role, roleRights } from "@/config/roles";
import { tokenTypes } from "@/config/tokens";
import { MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { decode, verify } from "hono/jwt";
import httpStatus from "http-status";
import { ApiError } from "./apiError";

const authenticate = async (jwtToken: string, secret: string) => {
  let authorized = false;
  let payload;
  try {
    authorized = await verify(jwtToken, secret);
    const decoded = decode(jwtToken);
    payload = decoded.payload;
    authorized = authorized && payload.type === tokenTypes.ACCESS;
  } catch (e) {}
  return { authorized, payload };
};

export const auth =
  (...requiredRights: Permission[]): MiddlewareHandler =>
  async (c, next) => {
    const credentials = c.req.header("Authorization");
    const config = getConfig(env(c));
    if (!credentials) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }

    const parts = credentials.split(/\s+/);
    if (parts.length !== 2) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }

    const jwtToken = parts[1];
    const { authorized, payload } = await authenticate(
      jwtToken,
      config.jwt.secret
    );

    if (!authorized || !payload) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }

    if (requiredRights.length) {
      const userRights = roleRights[payload.role as Role];
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        (userRights as unknown as string[]).includes(requiredRight)
      );
      const { userId } = c.req.param() as any;
      if (!hasRequiredRights && userId !== payload.sub) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
    }
    c.set("payload", payload);
    await next();
  };
