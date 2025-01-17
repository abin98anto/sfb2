import { UserInterface } from "../../interfaces/UserInterface";

export class GetUserByIdUseCase {
  constructor(private userRepository: UserInterface) {}

  execute(id: string) {
    return this.userRepository.findById(id);
  }
}
