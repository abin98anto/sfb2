import { IUser } from "../../entities/IUser";
import { UserInterface } from "../../interfaces/UserInterface";

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserInterface) {}

  execute(email: string): Promise<IUser | null> {
    return this.userRepository.findByEmail(email);
  }
}
