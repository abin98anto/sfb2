import { comments } from "../../../shared/constants/comments";
import { IUser } from "../../entities/IUser";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export class UpdateDetailsUseCase {
  constructor(private userRepository: UserInterface) {}

  // input: user id, nwe user data
  // output: updates user
  execute = async (
    _id: string,
    user: Partial<IUser>
  ): Promise<UseCaseResponse> => {
    try {
      let result = await this.userRepository.update(_id, user);
      return { success: true, message: comments.UPDATE_USR_SUCC, data: result };
    } catch (error) {
      console.log(comments.UPDATE_USR_UC_FAIL, error);
      return {
        success: false,
        message: comments.UPDATE_USR_UC_FAIL,
        err: error,
      };
    }
  };
}
