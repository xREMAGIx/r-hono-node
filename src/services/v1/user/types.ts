import { Role } from "@/config/roles";

export interface UserData {
  id: number;
  username: string;
  password: string;
  role: Role;
}

export interface GetUserByUsernameParams {
  username: string;
  password: string;
}

export interface GetUserByIdParams {
  /**
   * Id.
   *
   * @coerce
   */
  id: number;
}
