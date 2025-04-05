import { comments } from "../../../shared/constants/comments";
import { MessageInterface } from "../../interfaces/MessageInterface";

class LastMessageUseCase {
  constructor(private messageRepository: MessageInterface) {}

  // input: multiple chat ids.
  // output: last message of each chat.
  execute = async (
    chatIds: string[]
  ): Promise<{ chatId: string; message: any }[]> => {
    try {
      const data = await this.messageRepository.getLastMessagesForChats(
        chatIds
      );
      return data;
    } catch (error) {
      console.log(comments.LAST_MSG_FETCH_UC_FAIL, error);
      return [];
    }
  };
}

export default LastMessageUseCase;
