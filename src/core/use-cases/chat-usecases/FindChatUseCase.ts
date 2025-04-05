import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { MessageInterface } from "../../interfaces/MessageInterface";

class FindChatUseCase {
  constructor(private messageRepository: MessageInterface) {}

  // input: chat id.
  // output: messages of the chat.
  execute = async (chatId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.messageRepository.getMessagesByChatId(chatId);
      return { success: true, data };
    } catch (error) {
      console.log(comments.CHAT_FIND_UC_ERR, error);
      return {
        success: false,
        message: comments.CHAT_FIND_UC_ERR,
        err: error,
      };
    }
  };
}

export default FindChatUseCase;
