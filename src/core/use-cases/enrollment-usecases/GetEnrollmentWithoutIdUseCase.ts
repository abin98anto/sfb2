import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class GetEnrollmentWithoutIdUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}

  execute = async (
    userId: string,
    courseId: string
  ): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.findExisting(
        userId,
        courseId
      );
      return { success: true, data };
    } catch (error) {
      console.log("error getting enrollment without id", error);
      return {
        success: false,
        message: "error getting enrollment without id",
        err: error,
      };
    }
  };
}

export default GetEnrollmentWithoutIdUseCase;
