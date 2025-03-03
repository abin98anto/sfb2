import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import { MessageInterface } from "../../interfaces/MessageInterface";

class MarkAsReadUseCase {
  constructor(private messageRepository: MessageInterface) {}

  execute = async (messageId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.messageRepository.markAsRead(messageId);
      return { success: true, data };
    } catch (error) {
      console.log("error in mark as read use case", error);
      return {
        success: false,
        message: "error in mark as read use case",
        err: error,
      };
    }
  };
}

export default MarkAsReadUseCase;
