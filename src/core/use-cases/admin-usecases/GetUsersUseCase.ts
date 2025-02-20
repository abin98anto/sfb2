import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export class GetUsersUseCase {
  constructor(private userRepository: UserInterface) {}

  execute = async (role: string): Promise<UseCaseResponse> => {
    try {
      const users = await this.userRepository.getAll(role);
      return { success: true, message: comments.USERS_FETCH_SUCC, data: users };
    } catch (error) {
      console.log(comments.USERS_FETCH_FAIL, error);
      return { success: false, message: comments.USERS_FETCH_FAIL, err: error };
    }
  };
}
