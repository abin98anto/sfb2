import mongoose, { Schema, Types } from "mongoose";

const chatSchema = new Schema(
  {
    _id: { type: String, required: true },
    studentId: { type: String, required: true, ref: "User" },
    tutorId: { type: String, required: true, ref: "User" },
    courseId: { type: String, required: true, ref: "Course" },
    // do I need this array of message ids?
    // messages: [{ type: String, ref: "Message" }],
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
