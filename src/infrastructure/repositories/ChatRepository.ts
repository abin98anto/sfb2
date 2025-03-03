import IChat from "../../core/entities/IChat";
import IMessage from "../../core/entities/IMessage";
import ChatInterface from "../../core/interfaces/ChatInterface";
import ChatModel from "../db/schemas/chatSchema";

class ChatRepository implements ChatInterface {
  createChat = async (chat: IChat): Promise<IChat> => {
    const newChat = new ChatModel(chat);
    return newChat.save();
  };

  getChatHistory = async (chatId: string): Promise<IChat | null> => {
    return ChatModel.findById(chatId).populate("messages");
  };

  getChatByCourseAndUser = async (
    courseId: string,
    userId: string
  ): Promise<IChat | null> => {
    return ChatModel.findOne({ courseId, studentId: userId })
      .populate("tutorId")
      .populate("studentId")
      .populate("courseId")
      .populate("messages");
  };

  storeMessage = async (message: IMessage): Promise<void> => {
    const chat = await ChatModel.findById(message.chatId);
    if (chat) {
      chat.messages.push(message._id as string);
      await chat.save();
    }
  };

  getChatsForUser = async (userId: string): Promise<IChat[]> => {
    const chats = await ChatModel.find({
      $or: [{ studentId: userId }, { tutorId: userId }],
    })
      .populate("tutorId")
      .populate("studentId")
      .populate("courseId")
      .populate("messages")
      .exec();

    return chats;
  };
}

export default ChatRepository;
