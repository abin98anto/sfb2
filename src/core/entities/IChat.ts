import { Types } from "mongoose";

export default interface IChat {
  _id?: string;
  tutorId: string;
  studentId: string;
  courseId: string;
  // messages: string[];
  lastMessage?: string | null;
  unreadMessageCount: number;
}
