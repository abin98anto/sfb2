import { Types } from "mongoose";
import { enrollStatus } from "./misc/enums";

export default interface IEnrollment {
  _id?: string | Types.ObjectId;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  status: enrollStatus;
  completedLessons: string[];
  completedAt?: Date;
  quitAt?: Date;
}
