import { ApiError } from "@/middlewares/apiError";
import { User } from "@/models/v1/user.model";
import * as userService from "@/services/v1/user/user.service";
import httpStatus from "http-status";
import { GetProfileParams, LoginParams } from "./types";

export const login = async (params: LoginParams): Promise<any> => {
  const user = await userService.getUserByUsername(params);
  if (!user || !(await user.isPasswordMatch(params.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

export const getProfile = async (params: GetProfileParams): Promise<User> => {
  const user = await userService.getUserById(params);
  return user;
};
