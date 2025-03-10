import { comments } from "../../../shared/constants/comments";
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
      console.log(comments.APPROVE_TUTOR_UC_FAIL, error);
      return {
        success: false,
        message: comments.APPROVE_TUTOR_UC_FAIL,
        err: error,
      };
    }
  };
}
