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
    return await UserModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true, runValidators: true }
    );
  };

  delete = async (email: string): Promise<void> => {
    await UserModel.deleteOne({ email });
  };

  getAll = async (role: string): Promise<IUser[]> => {
    return await UserModel.find({ role });
  };

  getPaginated = async ({
    skip,
    limit,
    search,
  }: IParams): Promise<Partial<IUser>[]> => {
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

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

  getCount = async (search: string): Promise<number> => {
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    return await UserModel.countDocuments(query);
  };
}
