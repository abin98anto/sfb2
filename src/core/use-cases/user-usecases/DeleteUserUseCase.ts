import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<UseCaseResponse> {
    try {
      const userExists = await this.userRepository.findByEmail(email);
      if (!userExists) {
        return { success: false, message: comments.USER_NOT_FOUND };
      }

      await this.userRepository.delete(email);
      return { success: true, message: comments.USER_DEL_SUCC };
    } catch (error) {
      console.error(comments.USER_DEL_USECASE_FAIL, error);
      return {
        success: false,
        message: comments.USER_DEL_USECASE_FAIL,
        err: error,
      };
    }
  }
}
