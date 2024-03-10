import { Config } from "@/config/config";
import { Role } from "@/config/roles";
import { TokenType, tokenTypes } from "@/config/tokens";
import { UserData } from "@/services/v1/user/types";
import dayjs, { Dayjs } from "dayjs";
import { sign } from "hono/jwt";

type GenerateTokenType = {
  userId: number;
  type: TokenType;
  role: Role;
  expires: Dayjs;
  secret: string;
};

export const generateToken = async ({
  userId,
  type,
  role,
  expires,
  secret,
}: GenerateTokenType) => {
  const payload = {
    sub: userId.toString(),
    exp: expires.unix(),
    iat: dayjs().unix(),
    type,
    role,
  };
  return sign(payload, secret);
};

type GenerateAuthTokensType = {
  user: UserData;
  jwtConfig: Config["jwt"];
};

export const generateAuthTokens = async ({
  user,
  jwtConfig,
}: GenerateAuthTokensType) => {
  const accessTokenExpires = dayjs().add(
    jwtConfig.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = await generateToken({
    userId: user.id,
    type: tokenTypes.ACCESS,
    role: user.role,
    expires: accessTokenExpires,
    secret: jwtConfig.secret,
  });
  const refreshTokenExpires = dayjs().add(
    jwtConfig.refreshExpirationDays,
    "days"
  );
  const refreshToken = await generateToken({
    userId: user.id,
    type: tokenTypes.REFRESH,
    role: user.role,
    expires: accessTokenExpires,
    secret: jwtConfig.secret,
  });
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
