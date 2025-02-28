import IEnrollment from "../../entities/IEnrollment";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";
import { GetCourseDetailsUseCase } from "../course-usecases/GetCourseDetailsUseCase";
import { UpdateCourseUseCase } from "../course-usecases/UpdateCourseUseCase";

class EnrollUserUseCase {
  constructor(
    private enrollmentRepository: EnrollmentInterface,
    private updateCourseUseCase: UpdateCourseUseCase,
    private getCourseDetailsUseCase: GetCourseDetailsUseCase
  ) {}

  execute = async (enrollment: IEnrollment) => {
    const course = await this.getCourseDetailsUseCase.execute(
      enrollment.courseId as string
    );

    // const

    const updatedEnrollmentCount = course.data.enrollmentCount + 1;
    await this.updateCourseUseCase.execute({
      _id: enrollment.courseId as string,
      enrollmentCount: updatedEnrollmentCount,
    });
    return await this.enrollmentRepository.add(enrollment);
  };
}

export default EnrollUserUseCase;
