import { getConfig } from "@/config/config";
import { loginParamsSchema } from "@/documentation/v1/auth/schema";
import * as authService from "@/services/v1/auth/auth.service";
import * as tokenService from "@/services/v1/auth/token.service";
import { Handler } from "hono";
import { env } from "hono/adapter";
import { StatusCode } from "hono/utils/http-status";
import httpStatus from "http-status";

export const login: Handler = async (c) => {
  const config = getConfig(env(c));
  const bodyParse = c.req.json();
  const param = loginParamsSchema.parse(bodyParse);
  const user = await authService.login(param);
  const tokens = await tokenService.generateAuthTokens({
    user,
    jwtConfig: config.jwt,
  });

  return c.json(
    {
      data: {
        tokens: tokens,
        user: user,
      },
    },
    httpStatus.OK as StatusCode
  );
};

export const getProfile: Handler = async (c) => {
  const payload = c.get("payload");
  const userId = Number(payload.sub);

  const user = await authService.getProfile({ id: userId });

  return c.json(
    {
      data: user,
    },
    httpStatus.OK as StatusCode
  );
};
