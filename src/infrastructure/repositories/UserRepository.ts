import IEnrollment from "../../core/entities/IEnrollment";
import { IUser } from "../../core/entities/IUser";
import IParams from "../../core/entities/misc/IParams";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserModel } from "../db/schemas/userSchema";

export class UserRepository implements UserInterface {
  add = async (user: IUser): Promise<IUser> => {
    let { _id, ...newuser } = await new UserModel(user).save();
    const id = _id.toString();
    return { ...newuser, _id: id };
  };

  findById = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
  };

  findByEmail = async (email: string): Promise<IUser | null> => {
    return await UserModel.findOne({ email });
  };

  update = async (id: string, user: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
  };

  delete = async (id: string): Promise<void> => {
    await UserModel.findByIdAndDelete(id as string);
  };

  getAll = async (role: string): Promise<IUser[]> => {
    return await UserModel.find({ role });
  };

  getPaginated = async (
    role: string,
    { skip, limit, search }: IParams
  ): Promise<Partial<IUser>[]> => {
    const query = search
      ? { role, name: { $regex: search, $options: "i" } }
      : { role };

    const users = await UserModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return users.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));
  };

  getCount = async (role: string, search: string): Promise<number> => {
    const query = search
      ? { role, name: { $regex: search, $options: "i" } }
      : { role };

    return await UserModel.countDocuments(query);
  };
}
