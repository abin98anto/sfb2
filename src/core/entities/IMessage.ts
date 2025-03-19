import { Types } from "mongoose";

export default interface IMessage {
  _id: Types.ObjectId;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  contentType: string;
  isRead: boolean;
}
