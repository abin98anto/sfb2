import IChat from "../../core/entities/IChat";
import IMessage from "../../core/entities/IMessage";
import { MessageInterface } from "../../core/interfaces/MessageInterface";
import ChatModel from "../db/schemas/chatSchema";
import { MessageModel } from "../db/schemas/messageSchema";

class MessageRepository implements MessageInterface {
  createMessage = async (message: IMessage): Promise<IMessage> => {
    const newMessage = new MessageModel(message);
    const savedMessage = newMessage.save();

    const currentChat = await ChatModel.findOneAndUpdate(
      { _id: message.chatId },
      {
        lastMessage: (await savedMessage)._id,
        $inc: { unreadMessageCount: 1 },
      }
    );

    return savedMessage;
  };

  findByConversation = async (conversationId: string): Promise<IMessage[]> => {
    return MessageModel.find({ conversationId });
  };

  markAsRead = async (messageIds: string[]): Promise<void> => {
    const result = await MessageModel.updateMany(
      { _id: { $in: messageIds } },
      { $set: { isRead: true } }
    );
    if (result.modifiedCount > 0) {
      const updatedMessages = await MessageModel.find({
        _id: { $in: messageIds },
      });
    }
  };

  getMessagesForChat = async (chatId: string): Promise<IMessage[]> => {
    return MessageModel.find({ chatId })
      .populate("sender")
      .populate("receiver");
  };

  countUnreadMessages = async (userId: string): Promise<number> => {
    const count = await MessageModel.countDocuments({
      receiverId: userId,
      isRead: false,
    });

    return count;
  };

  getLastMessagesForChats = async (
    chatIds: string[]
  ): Promise<{ chatId: string; message: any }[]> => {
    const lastMessages = [];

    for (const chatId of chatIds) {
      const message = await MessageModel.findOne({ chatId })
        .sort({ timestamp: -1 })
        .limit(1)
        .populate("senderId", "name")
        .lean();

      if (message) {
        lastMessages.push({
          chatId,
          message,
        });
      }
    }

    return lastMessages;
  };

  getMessagesByChatId = async (chatId: string): Promise<IMessage[]> => {
    return MessageModel.find({ chatId });
  };

  clearUnreadCount = async (chatId: string): Promise<IChat> => {
    const updatedChat = await ChatModel.findOneAndUpdate(
      { _id: chatId },
      { unreadMessageCount: 0 },
      { new: true }
    );

    if (!updatedChat) {
      throw new Error("Chat not found");
    }

    return updatedChat;
  };
}

export default MessageRepository;
