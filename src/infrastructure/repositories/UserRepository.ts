import { IUser } from "../../core/entities/IUser";
import { UserInterface } from "../../core/interfaces/UserInterface";

export class UserRepository implements UserInterface {
  add(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  update(user: Partial<IUser>): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}
