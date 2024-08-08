import { promises } from "dns";
import { UserModel } from "../schema/user";
import { UserType } from "../types/user.type";
import { UpdateWriteOpResult } from "mongoose";

export class UserService {
  async post(data: { id: string; password: string }): Promise<UserType> {
    try {
      const user = await UserModel.create(data);
      return user as UserType;
    } catch (err) {
      throw err;
    }
  }

  async get(userId: string): Promise<UserType> {
    const user = await UserModel.findOne({ id: userId });
    return user as UserType;
  }

  async patch(
    userId: string,
    data: { id: string; password: string }
  ): Promise<UpdateWriteOpResult> {
    try {
      const user = await UserModel.updateOne({ id: userId }, data);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete(userId: string) {
    try {
      const user = await UserModel.deleteOne({ id: userId });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
