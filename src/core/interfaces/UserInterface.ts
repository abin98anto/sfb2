import { IUser } from "../entities/IUser";

export interface UserInterface {
  add(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(user: Partial<IUser>): Promise<IUser>;
}
