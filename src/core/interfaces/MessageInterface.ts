import IMessage from "../entities/IMessage";

export interface MessageInterface {
  createMessage(message: IMessage): Promise<IMessage>;
  findByConversation(conversationId: string): Promise<IMessage[]>;
  markAsRead(messageId: string): Promise<IMessage | null>;
  getMessagesForChat(chatId: string): Promise<IMessage[]>;
}
