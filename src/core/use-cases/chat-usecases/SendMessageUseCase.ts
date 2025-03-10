import { comments } from "../../../shared/constants/comments";
import IMessage from "../../entities/IMessage";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { MessageInterface } from "../../interfaces/MessageInterface";

class SendMessageUseCase {
  constructor(private messageRepository: MessageInterface) {}

  execute = async (message: IMessage): Promise<UseCaseResponse> => {
    try {
      const data = await this.messageRepository.createMessage(message);
      return { success: true, data };
    } catch (error) {
      console.log(comments.MESSAGE_CREATE_UC_FAIL, error);
      return {
        success: false,
        message: comments.MESSAGE_CREATE_UC_FAIL,
        err: error,
      };
    }
  };
}

export default SendMessageUseCase;
