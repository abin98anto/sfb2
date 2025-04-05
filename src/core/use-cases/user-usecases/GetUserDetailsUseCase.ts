import { comments } from "../../../shared/constants/comments";
import { IUser } from "../../entities/IUser";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export class GetUserDetailsUseCase {
  constructor(private userRepository: UserInterface) {}

  // input: user id
  // output: returns user details.
  execute = async (_id: string): Promise<UseCaseResponse> => {
    try {
      const user: IUser | null = await this.userRepository.findById(_id);
      if (!user) {
        return { success: false, message: comments.USER_NOT_FOUND };
      }
      return { success: true, message: comments.USR_DETAILS_SUCC, data: user };
    } catch (error) {
      console.log(error);
      return { success: false, message: comments.USR_DETAILS_UC_FAIL };
    }
  };
}
