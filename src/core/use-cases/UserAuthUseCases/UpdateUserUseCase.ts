import { IUser } from "../../entities/IUser";
import { UserInterface } from "../../interfaces/UserInterface";

export class UpdateUserUseCase {
  constructor(private userRepository: UserInterface) {}

  execute(id: string, user: IUser) {
    return this.userRepository.update(id, user);
  }
}
