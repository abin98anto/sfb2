import IMessage from "../../core/entities/IMessage";
import { MessageInterface } from "../../core/interfaces/MessageInterface";
import ChatModel from "../db/schemas/chatSchema";
import { MessageModel } from "../db/schemas/messageSchema";

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
}

export default MessageRepository;
