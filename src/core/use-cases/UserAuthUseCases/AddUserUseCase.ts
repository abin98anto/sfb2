import { IUser } from "../../entities/IUser";
import { UserInterface } from "../../interfaces/UserInterface";

export class AddUserUseCase {
  constructor(private userRepository: UserInterface) {}

  execute(user: IUser) {
    return this.userRepository.add(user);
  }
}
