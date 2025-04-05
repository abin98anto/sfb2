import { comments } from "../../../shared/constants/comments";
import ChatInterface from "../../interfaces/ChatInterface";

class GetAllChatsUseCase {
  constructor(private chatRepository: ChatInterface) {}

  // input: user id.
  // output: list of the user's chat.
  execute = async (userId: string) => {
    try {
      const data = await this.chatRepository.getChatsForUser(userId);
      return { success: true, data };
    } catch (error) {
      console.log(comments.USER_CHAT_FETCH_UC_ERR, error);
      return {
        success: false,
        message: comments.USER_CHAT_FETCH_UC_ERR,
        err: error,
      };
    }
  };
}

export default GetAllChatsUseCase;
