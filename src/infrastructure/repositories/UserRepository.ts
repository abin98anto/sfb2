import { Types } from "mongoose";
import { IUser } from "../../core/entities/IUser";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserModel } from "../db/schemas/userSchema";

export class UserRepository implements UserInterface {
  async add(user: IUser): Promise<IUser> {
    let { _id, ...newuser } = await new UserModel(user).save();
    const id = _id.toString();
    return { ...newuser, _id: id };
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  async update(id: string, user: Partial<IUser>): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
