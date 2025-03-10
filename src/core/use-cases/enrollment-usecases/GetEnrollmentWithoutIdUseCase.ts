import { comments } from "../../../shared/constants/comments";
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
      console.log(comments.ENROLL_FETCH_NOID_UC_FAIL, error);
      return {
        success: false,
        message: comments.ENROLL_FETCH_NOID_UC_FAIL,
        err: error,
      };
    }
  };
}

export default GetEnrollmentWithoutIdUseCase;
