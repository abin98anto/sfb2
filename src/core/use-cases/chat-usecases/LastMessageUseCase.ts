import { MessageInterface } from "../../interfaces/MessageInterface";

class LastMessageUseCase {
  constructor(private messageRepository: MessageInterface) {}

  execute = async (
    chatIds: string[]
  ): Promise<{ chatId: string; message: any }[]> => {
    try {
      const data = await this.messageRepository.getLastMessagesForChats(
        chatIds
      );
      return data;
    } catch (error) {
      console.log("Error in last message use case", error);
      return [];
    }
  };
}

export default LastMessageUseCase;
