import { Role } from "@/config/roles";
import { BaseModel } from "@/models/base.model";
import { UserData } from "@/services/v1/user/types";
import bcrypt from "bcrypt";

export class User extends BaseModel implements UserData {
  id: number;
  username: string;
  password: string;
  role: Role;

  private_fields = ["password"];

  constructor(user: UserData) {
    super();
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }

  isPasswordMatch = async (userPassword: string): Promise<boolean> => {
    if (!this.password) throw "No password connected to user";
    return new Promise((resolve, reject) => {
      resolve(true);
    });
    //TODO: update to use bcrypt
    return await bcrypt.compare(userPassword, this.password);
  };
}
