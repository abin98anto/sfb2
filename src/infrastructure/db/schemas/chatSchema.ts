import mongoose, { Schema, Types } from "mongoose";

const chatSchema = new Schema(
  {
    _id: { type: String, required: true },
    studentId: { type: String, required: true, ref: "User" },
    tutorId: { type: String, required: true, ref: "User" },
    courseId: { type: String, required: true, ref: "Course" },
    lastMessage: {
      type: String,
      ref: "Message",
    },
    unreadMessageCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", chatSchema);
export default ChatModel;
