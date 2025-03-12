import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { MessageInterface } from "../../interfaces/MessageInterface";
import { comments } from "../../../shared/constants/comments";

class MarkAsReadUseCase {
  constructor(private messageRepository: MessageInterface) {}

  execute = async (messageId: string[]): Promise<UseCaseResponse> => {
    try {
      const data = await this.messageRepository.markAsRead(messageId);
      return { success: true, data };
    } catch (error) {
      console.log(comments.MARK_AS_READ_UC_ERR, error);
      return {
        success: false,
        message: comments.MARK_AS_READ_UC_ERR,
        err: error,
      };
    }
  };
}

export default MarkAsReadUseCase;
