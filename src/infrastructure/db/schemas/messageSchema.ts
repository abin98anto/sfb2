import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chatId: { type: String, required: true, ref: "Chat" },
    senderId: { type: String, required: true, ref: "User" },
    receiverId: { type: String, required: true, ref: "User" },
    content: { type: String, required: true },
    contentType: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const MessageModel = mongoose.model("Message", messageSchema);
