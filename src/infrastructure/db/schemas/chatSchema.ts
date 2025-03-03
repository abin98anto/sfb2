import mongoose, { Schema } from "mongoose";
import IChat from "../../../core/entities/IChat";

const chatSchema = new Schema<IChat>(
  {
    _id: { type: String, required: true },
    studentId: { type: String, required: true, ref: "User" },
    tutorId: { type: String, required: true, ref: "User" },
    courseId: { type: String, required: true, ref: "Course" },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

chatSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = `${this.studentId}-${this.tutorId}-${this.courseId}`;
  }
  next();
});

const ChatModel = mongoose.model("Chat", chatSchema);
export default ChatModel;
