import IMessage from "../../core/entities/IMessage";
import { MessageInterface } from "../../core/interfaces/MessageInterface";
import ChatModel from "../db/schemas/chatSchema";
import { MessageModel } from "../db/schemas/messageSchema";
import userRouter from "../../presentation/routes/userRoutes";

class MessageRepository implements MessageInterface {
  createMessage = async (message: IMessage): Promise<IMessage> => {
    const savedMessage = await MessageModel.create(message);

    await ChatModel.findByIdAndUpdate(
      message.chatId,
      {
        $push: { messages: savedMessage._id },
      },
      { new: true }
    );

    return savedMessage;
  };

  findByConversation = async (conversationId: string): Promise<IMessage[]> => {
    return MessageModel.find({ conversationId });
  };

  markAsRead = async (messageIds: string[]): Promise<void> => {
    const result = await MessageModel.updateMany(
      { _id: { $in: messageIds } }, // Filter: match any messages with IDs in the array
      { $set: { isRead: true } } // Update: set isRead to true
    );

    if (result.modifiedCount > 0) {
      // Return the updated messages
      const updatedMessages = await MessageModel.find({
        _id: { $in: messageIds },
      });
      // return updatedMessages;
    }
    // return null;
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

  getMessagesByChatId = async (
    chatId: string,
    userId: string
  ): Promise<IMessage[]> => {
    return MessageModel.find({ chatId, receiverId: userId });
  };
}

export default MessageRepository;
