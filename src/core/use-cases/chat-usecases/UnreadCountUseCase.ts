import { MessageInterface } from "../../interfaces/MessageInterface";

class UnreadCountUseCase {
  constructor(private messageRepository: MessageInterface) {}

  execute = async (userId: string): Promise<number> => {
    try {
      const count = await this.messageRepository.countUnreadMessages(userId);
      return count;
    } catch (error) {
      console.log("Error in unread count use case", error);
      return 0;
    }
  };
}

export default UnreadCountUseCase;
