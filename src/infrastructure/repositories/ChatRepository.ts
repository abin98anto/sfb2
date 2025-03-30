import IChat from "../../core/entities/IChat";
import ChatInterface from "../../core/interfaces/ChatInterface";
import ChatModel from "../db/schemas/chatSchema";

class ChatRepository implements ChatInterface {
  createChat = async (chat: IChat): Promise<IChat> => {
    const newChat = new ChatModel(chat);
    const savedChat = newChat.save();
    return savedChat;
  };

  getChatHistory = async (chatId: string): Promise<IChat | null> => {
    return ChatModel.findById(chatId);
  };

  getChatByCourseAndUser = async (
    courseId: string,
    userId: string
  ): Promise<IChat | null> => {
    return ChatModel.findOne({ courseId, studentId: userId })
      .populate("tutorId")
      .populate("studentId")
      .populate("courseId");
  };

  getChatsForUser = async (userId: string): Promise<IChat[]> => {
    const chats = await ChatModel.find({
      $or: [{ studentId: userId }, { tutorId: userId }],
    })
      .populate("tutorId")
      .populate("studentId")
      .populate("courseId")
      .populate("lastMessage")
      .exec();

    return chats;
  };

  getStudentList = async (tutorId: string): Promise<IChat[]> => {
    const data = await ChatModel.find({ tutorId: tutorId })
      .populate("studentId")
      .populate("courseId")
      .exec();

    return data;
  };
}

export default ChatRepository;
