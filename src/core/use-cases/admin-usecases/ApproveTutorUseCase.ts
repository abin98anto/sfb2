import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export default class ApproveTutorUseCase {
  constructor(private userRepository: UserInterface) {}

  execute = async (id: string): Promise<UseCaseResponse> => {
    try {
      const result = await this.userRepository.update(id, {
        isVerified: true,
      });
      return { success: true, data: result };
    } catch (error) {
      console.log("error when approving tutor in usecase", error);
      return {
        success: false,
        message: "error when approving tutor in usecase",
        err: error,
      };
    }
  };
}
