import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ChatInterface from "../../interfaces/ChatInterface";

class FindChatUseCase {
  constructor(private chatRepository: ChatInterface) {}

  execute = async (chatId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.chatRepository.getChatHistory(chatId);
      return { success: true, data };
    } catch (error) {
      console.log("error finding chats", error);
      return {
        success: false,
        message: "error finding chats",
        err: error,
      };
    }
  };
}

export default FindChatUseCase;
