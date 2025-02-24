import { UserInterface } from "../../interfaces/UserInterface";

export default class BlockUsersUseCase {
  constructor(private userRepository: UserInterface) {}

  execute = async (id: string): Promise<void> => {

  };
}
