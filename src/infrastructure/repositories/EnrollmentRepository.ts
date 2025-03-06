import { Types } from "mongoose";
import { ICourse } from "../../core/entities/ICourse";
import IEnrollment from "../../core/entities/IEnrollment";
import EnrollmentInterface from "../../core/interfaces/EnrollmentInterface";
import { Course } from "../db/schemas/courseSchema";
import EnrollmentModel from "../db/schemas/enrollmentSchema";
import { IUser } from "../../core/entities/IUser";

class EnrollmentRepository implements EnrollmentInterface {
  add = async (data: IEnrollment): Promise<IEnrollment> => {
    const newEnrollment = new EnrollmentModel(data);
    await newEnrollment.save();
    return newEnrollment as IEnrollment;
  };

  findById = async (enrollmentId: string): Promise<IEnrollment | null> => {
    return await EnrollmentModel.findById(enrollmentId)
      .populate(["courseId", "userId"])
      .lean<IEnrollment>();
  };

  findByUserId = async (userId: string): Promise<IEnrollment[] | null> => {
    const enrollments = await EnrollmentModel.find({ userId })
      .populate("courseId")
      .lean();
    if (!enrollments) return null;
    return enrollments.map((doc) => ({
      ...doc,
      userId: doc.userId as string,
    })) as IEnrollment[];
  };

  findExisting(userId: string, courseId: string): Promise<IEnrollment | null> {
    return EnrollmentModel.findOne({ userId, courseId });
  }

  getAll = async (): Promise<IEnrollment[]> => {
    return await EnrollmentModel.find();
  };

  update = async (
    updates: Partial<IEnrollment>
  ): Promise<IEnrollment | null> => {
    return await EnrollmentModel.findByIdAndUpdate(
      updates._id as string,
      { $set: updates },
      { new: true }
    );
  };

  getPaginated = async ({
    skip,
    limit,
    search,
  }: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<IEnrollment[]> => {
    const query = search
      ? { name: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    // Add .lean() to convert to plain JavaScript objects
    const enrollments = await EnrollmentModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    // Map to ensure types match the interface
    return enrollments.map((doc) => ({
      ...doc,
      userId: doc.userId as string,
      courseId: doc.courseId as string | ICourse,
    })) as IEnrollment[];
  };

  getCount = async (search: string): Promise<number> => {
    const query = search
      ? { name: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    return await EnrollmentModel.countDocuments(query);
  };
}

export default EnrollmentRepository;
