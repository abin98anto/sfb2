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
      console.log("error updating enrollment", error);
      return {
        success: false,
        message: "error updating enrollment",
        err: error,
      };
    }
  };
}

export default UpdateEnrollmentUseCase;
