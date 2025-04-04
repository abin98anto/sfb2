import { IUser } from "../entities/IUser";
import IParams from "../entities/misc/IParams";

export interface UserInterface {
  add(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
  delete(email: string): Promise<void>;
  getAll(role: string): Promise<IUser[]>;
  addToWallet(id: string, amount: number): Promise<IUser | null>;

  getPaginated(role: string, params: IParams): Promise<Partial<IUser>[]>;
  getCount(role: string, search: string): Promise<number>;
}
