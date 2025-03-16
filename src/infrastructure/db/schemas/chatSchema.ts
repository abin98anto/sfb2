import mongoose, { Schema } from "mongoose";
import IChat from "../../../core/entities/IChat";

const chatSchema = new Schema<IChat>(
  {
    _id: { type: String, required: true },
    studentId: { type: String, required: true, ref: "User" },
    tutorId: { type: String, required: true, ref: "User" },
    courseId: { type: String, required: true, ref: "Course" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    // lastMessage: {
    //   content: String,
    //   senderId: { type: String, ref: "User" },
    //   timestamp: Date,
    //   contentType: String,
    // },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", chatSchema);
export default ChatModel;
