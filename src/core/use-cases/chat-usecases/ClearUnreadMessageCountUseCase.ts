import { MessageInterface } from "../../interfaces/MessageInterface";

class ClearUnreadMessageCountUseCase {
  constructor(private messageRepository: MessageInterface) {}

  // input: user id.
  // output: clears the unread count of the chat.
  execute = async (userId: string): Promise<void> => {
    await this.messageRepository.clearUnreadCount(userId);
  };
}

export default ClearUnreadMessageCountUseCase;
