import mongoose, { Schema } from "mongoose";
import { EnrollStatus } from "../../../core/entities/misc/enums";

const EnrollmentSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User" },
    courseId: { type: String, ref: "Course" },
    enrolledAt: { type: Date, default: Date.now },
    status: { type: String, default: EnrollStatus.PENDING },
    completedLessons: { type: [String], default: [] },
    completedAt: { type: Date },
    quitAt: Date,
  },
  {
    timestamps: true,
  }
);

const EnrollmentModel = mongoose.model("Enrollment", EnrollmentSchema);
export default EnrollmentModel;
