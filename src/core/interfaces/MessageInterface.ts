import IMessage from "../entities/IMessage";

export interface MessageInterface {
  createMessage(message: IMessage): Promise<IMessage>;
  findByConversation(conversationId: string): Promise<IMessage[]>;
  markAsRead(messageIds: string[]): Promise<void>;
  getMessagesForChat(chatId: string): Promise<IMessage[]>;
  countUnreadMessages(userId: string): Promise<number>;
  getLastMessagesForChats(
    chatIds: string[]
  ): Promise<{ chatId: string; message: any }[]>;
  getMessagesByChatId(chatId: string, userId: string): Promise<IMessage[]>;
}
