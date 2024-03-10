import { UserData } from "../user/types";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  data: {
    tokens: string;
    user: Omit<UserData, "password">;
  };
}

export interface ProfileData {
  data: Omit<UserData, "password">;
}

export interface GetProfileParams {
  id: number;
}
