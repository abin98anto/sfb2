import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { NodemailerInterface } from "../../interfaces/misc/NodemailerInterface";
import { UserInterface } from "../../interfaces/UserInterface";

export default class DenyTutorUseCase {
  constructor(
    private userRepository: UserInterface,
    private nodemailerService: NodemailerInterface
  ) {}

  execute = async (id: string, message: string): Promise<UseCaseResponse> => {
    try {
      const user = await this.userRepository.findById(id);
      this.nodemailerService.send(
        user?.email as string,
        comments.TUTOR_DENY_SUBJECT,
        message
      );
      await this.userRepository.delete(id);
      return { success: true };
    } catch (error) {
      console.log(comments.TUTOR_DENY_UC_ERR, error);
      return {
        success: false,
        message: comments.TUTOR_DENY_UC_ERR,
        err: error,
      };
    }
  };
}
