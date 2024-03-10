import { ApiError } from "@/middlewares/apiError";
import { User } from "@/models/v1/user.model";
import httpStatus from "http-status";
import { GetUserByIdParams, GetUserByUsernameParams, UserData } from "./types";

const users: UserData[] = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "user",
    role: "user",
  },
];

export const getUserByUsername = async (
  params: GetUserByUsernameParams
): Promise<User> => {
  const user = users.find((ele) => ele.username === params.username);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return new User(user);
};

export const getUserById = async (params: GetUserByIdParams): Promise<User> => {
  const user = users.find((ele) => ele.id === params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return new User(user);
};
