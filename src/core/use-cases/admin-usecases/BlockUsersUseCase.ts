import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export default class BlockUsersUseCase {
  constructor(private userRepository: UserInterface) {}

  execute = async (id: string): Promise<UseCaseResponse> => {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new Error("User not found");

      const updatedStatus = !user.isActive;
      const result = await this.userRepository.update(id, {
        isActive: updatedStatus,
      });

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.log("error when blockin/unblocking user in usecase", error);
      return {
        success: false,
        message: "error when blockin/unblocking user in usecase",
        err: error,
      };
    }
  };
}
