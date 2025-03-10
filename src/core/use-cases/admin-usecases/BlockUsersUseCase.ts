import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { UserInterface } from "../../interfaces/UserInterface";

export default class BlockUsersUseCase {
  constructor(private userRepository: UserInterface) {}

  execute = async (id: string): Promise<UseCaseResponse> => {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new Error(comments.USER_NOT_FOUND);

      const updatedStatus = !user.isActive;
      const data = await this.userRepository.update(id, {
        isActive: updatedStatus,
      });

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log(comments.BLOCK_UNBLOCK_UC_ERR, error);
      return {
        success: false,
        message: comments.BLOCK_UNBLOCK_UC_ERR,
        err: error,
      };
    }
  };
}
