import { Types } from "mongoose";
import { enrollStatus } from "./misc/enums";
import { ICourse } from "./ICourse";

export default interface IEnrollment {
  _id?: string | Types.ObjectId;
  userId?: string | null;
  courseId: string | ICourse | null;
  enrolledAt: Date;
  status: enrollStatus;
  completedLessons: string[];
  completedAt?: Date;
  quitAt?: Date;
}
