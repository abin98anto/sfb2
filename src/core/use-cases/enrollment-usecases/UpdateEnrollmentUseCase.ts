import { comments } from "../../../shared/constants/comments";
import IEnrollment from "../../entities/IEnrollment";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";

class UpdateEnrollmentUseCase {
  constructor(private enrollmentRepository: EnrollmentInterface) {}

  execute = async (updates: Partial<IEnrollment>): Promise<UseCaseResponse> => {
    try {
      const data = await this.enrollmentRepository.update(updates);
      return { success: true, data };
    } catch (error) {
      console.log(comments.ENROLL_UPDATE_UC_FAIL, error);
      return {
        success: false,
        message: comments.ENROLL_UPDATE_UC_FAIL,
        err: error,
      };
    }
  };
}

export default UpdateEnrollmentUseCase;
