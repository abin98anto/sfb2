import { IUser } from "../entities/IUser";
import IParams from "../entities/misc/IParams";

export interface UserInterface {
  add(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
  delete(email: string): Promise<void>;
  getAll(role: string): Promise<IUser[]>;

  getPaginated(params: IParams): Promise<Partial<IUser>[]>;
  getCount(search: string): Promise<number>;
}
