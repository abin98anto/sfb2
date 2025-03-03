import ChatInterface from "../../interfaces/ChatInterface";

class GetAllChatsUseCase {
  constructor(private chatRepository: ChatInterface) {}

  execute = async (userId: string) => {
    try {
      const data = await this.chatRepository.getChatsForUser(userId);
      return { success: true, data };
    } catch (error) {
      console.log("error in fetching users chats in use case", error);
      return {
        success: false,
        message: "error in fetching users chats in use case",
        err: error,
      };
    }
  };
}

export default GetAllChatsUseCase;
