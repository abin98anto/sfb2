import IEnrollment from "../../core/entities/IEnrollment";
import IParams from "../../core/entities/misc/IParams";
import EnrollmentInterface from "../../core/interfaces/EnrollmentInterface";
import EnrollmentModel from "../db/schemas/enrollmentSchema";

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

  findByUserId = async (userId: string): Promise<IEnrollment | null> => {
    return await EnrollmentModel.findOne({ userId })
      .populate(["courseId", "userId"])
      .lean<IEnrollment>();
  };

  getAll = async (): Promise<IEnrollment[]> => {
    return await EnrollmentModel.find();
  };

  update = async (
    updates: Partial<IEnrollment>
  ): Promise<IEnrollment | null> => {
    return await EnrollmentModel.findByIdAndUpdate(
      updates._id,
      { $set: updates },
      { new: true }
    );
  };
}

export default EnrollmentRepository;
