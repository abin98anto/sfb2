import { MessageInterface } from "../../interfaces/MessageInterface";

class ClearUnreadMessageCountUseCase {
  constructor(private messageRepository: MessageInterface) {}

  execute = async (userId: string): Promise<void> => {
    await this.messageRepository.clearUnreadCount(userId);
  };
}

export default ClearUnreadMessageCountUseCase;
