import { UserInterface } from "../../interfaces/UserInterface";

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserInterface) {}

  execute(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
