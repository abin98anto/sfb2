import mongoose, { Schema } from "mongoose";
import IMessage from "../../../core/entities/IMessage";

const messageSchema = new Schema<IMessage>(
  {
    chatId: { type: String, required: true, ref: "Chat" },
    senderId: { type: String, required: true, ref: "User" },
    receiverId: { type: String, required: true, ref: "User" },
    content: String,
    contentType: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model("Message", messageSchema);
