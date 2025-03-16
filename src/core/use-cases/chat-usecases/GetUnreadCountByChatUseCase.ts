import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { MessageInterface } from "../../interfaces/MessageInterface";

class UnreadCountByChatUseCase {
  constructor(private messageRepository: MessageInterface) {}
  execute = async (
    chatId: string,
    userId: string
  ): Promise<UseCaseResponse> => {
    try {
      const data = await this.messageRepository.getMessagesByChatId(
        chatId,
        userId
      );
      return { success: true, data };
    } catch (error) {
      console.log("error getting unread count of chat in use case", error);
      return {
        success: false,
        message: "error getting unread count of chat in use case",
        err: error,
      };
    }
  };
}

export default UnreadCountByChatUseCase;
