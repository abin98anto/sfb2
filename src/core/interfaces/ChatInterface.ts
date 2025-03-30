import IChat from "../entities/IChat";

export default interface ChatInterface {
  createChat(chat: IChat): Promise<IChat>;
  getChatHistory(chatId: string): Promise<IChat | null>;
  getChatByCourseAndUser(
    courseId: string,
    userId: string
  ): Promise<IChat | null>;
  getChatsForUser(userId: string): Promise<IChat[]>;
  getStudentList(tutorId: string): Promise<IChat[]>;
}
