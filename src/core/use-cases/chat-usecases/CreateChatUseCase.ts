import IChat from "../../entities/IChat";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import ChatInterface from "../../interfaces/ChatInterface";

class CreateChatUseCase {
  constructor(private chatRepository: ChatInterface) {}

  execute = async (chat: IChat): Promise<UseCaseResponse> => {
    try {
      const data = await this.chatRepository.createChat(chat);
      return { success: true, data };
    } catch (error) {
      console.log("error creating chat", error);
      return {
        success: false,
        message: "error creating chat",
        err: error,
      };
    }
  };
}

export default CreateChatUseCase;
