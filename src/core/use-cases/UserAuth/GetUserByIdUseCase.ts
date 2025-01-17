import { IUser } from "../../entities/IUser";
import { UserInterface } from "../../interfaces/UserInterface";

export class GetUserByIdUseCase {
  constructor(private userRepository: UserInterface) {}

  execute(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }
}
