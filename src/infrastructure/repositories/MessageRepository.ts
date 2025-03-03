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

  markAsRead = async (messageId: string): Promise<IMessage | null> => {
    const message = await MessageModel.findById(messageId);
    if (message) {
      message.isRead = true;
      await message.save();
      return message;
    }
    return null;
  };

  getMessagesForChat = async (chatId: string): Promise<IMessage[]> => {
    return MessageModel.find({ chatId })
      .populate("sender")
      .populate("receiver");
  };
}

export default MessageRepository;
