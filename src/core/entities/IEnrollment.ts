import { Types } from "mongoose";
import { enrollStatus } from "./misc/enums";
import { ICourse } from "./ICourse";
import { IUser } from "./IUser";

export default interface IEnrollment {
  _id?: string | Types.ObjectId;
  userId?: IUser | string | null;
  courseId: string | ICourse | null;
  enrolledAt: Date;
  status: enrollStatus;
  completedLessons: string[];
  completedAt?: Date;
  quitAt?: Date;
  grade?: string;
}
