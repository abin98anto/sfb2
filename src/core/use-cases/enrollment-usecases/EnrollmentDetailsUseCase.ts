import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class EnrollmentDetailsUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}

  execute = async (enrollmentId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.findById(enrollmentId);
      return { success: true, data };
    } catch (error) {
      console.log(comments.ENROLL_DETAILS_FETCH_UC_FAIL, error);
      return {
        success: false,
        message: comments.ENROLL_DETAILS_FETCH_UC_FAIL,
        err: error,
      };
    }
  };
}

export default EnrollmentDetailsUseCase;
