import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ChatInterface from "../../interfaces/ChatInterface";

class FindChatUseCase {
  constructor(private chatRepository: ChatInterface) {}

  execute = async (chatId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.chatRepository.getChatHistory(chatId);
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
