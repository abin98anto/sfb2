import { UserModel } from "../../../infrastructure/db/schemas/userSchema";
import { comments } from "../../../shared/constants/comments";
import IChat from "../../entities/IChat";
import IEnrollment from "../../entities/IEnrollment";
import { IUser } from "../../entities/IUser";
import ChatInterface from "../../interfaces/ChatInterface";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";
import { UserInterface } from "../../interfaces/UserInterface";
import { GetCourseDetailsUseCase } from "../course-usecases/GetCourseDetailsUseCase";
import { UpdateCourseUseCase } from "../course-usecases/UpdateCourseUseCase";
import { GetUserDetailsUseCase } from "../user-usecases/GetUserDetailsUseCase";
import { UpdateDetailsUseCase } from "../user-usecases/UpdateDetailsUseCase";

class EnrollUserUseCase {
  constructor(
    private enrollmentRepository: EnrollmentInterface,
    private chatRepository: ChatInterface,
    private updateCourseUseCase: UpdateCourseUseCase,
    private getCourseDetailsUseCase: GetCourseDetailsUseCase,
    private getUserDetailsUseCase: GetUserDetailsUseCase,
    private updateDetailsUseCase: UpdateDetailsUseCase
  ) {}

  execute = async (enrollment: IEnrollment, user: IUser) => {
    const { data: course } = await this.getCourseDetailsUseCase.execute(
      enrollment.courseId as string
    );

    const existingEnrollment = await this.enrollmentRepository.findExisting(
      enrollment.userId as string,
      enrollment.courseId as string
    );
    if (existingEnrollment) {
      return existingEnrollment;
    }

    if (!course?.tutors || course.tutors.length === 0) {
      throw new Error(comments.TUTORS_UNAVAILABLE);
    }

    const tutorStudentCounts = [];
    for (const tutorId of course.tutors) {
      const { data: tutorData } = await this.getUserDetailsUseCase.execute(
        tutorId.toString()
      );
      const studentCount = tutorData?.students?.length || 0;
      tutorStudentCounts.push({ tutorId: tutorId.toString(), studentCount });
    }

    let selectedTutorId;

    if (tutorStudentCounts.length === 0) {
      throw new Error(comments.TUTOR_INFO_FETCH_FAIL);
    } else {
      tutorStudentCounts.sort((a, b) => a.studentCount - b.studentCount);
      const lowestCount = tutorStudentCounts[0].studentCount;
      const tutorsWithLowestCount = tutorStudentCounts.filter(
        (tutor) => tutor.studentCount === lowestCount
      );

      if (tutorsWithLowestCount.length > 1) {
        const randomIndex = Math.floor(
          Math.random() * tutorsWithLowestCount.length
        );
        selectedTutorId = tutorsWithLowestCount[randomIndex].tutorId;
      } else {
        selectedTutorId = tutorStudentCounts[0].tutorId;
      }
    }

    const chatId = `${enrollment.userId}-${selectedTutorId}-${enrollment.courseId}`;
    const existingChat = await this.chatRepository.getChatHistory(chatId);
    if (!existingChat) {
      const newRoom: IChat = {
        _id: chatId,
        studentId: enrollment.userId as string,
        tutorId: selectedTutorId,
        courseId: course?._id as string,
        lastMessage: null,
        unreadMessageCount: 0,
      };

      await this.chatRepository.createChat(newRoom);
    }

    const updatedEnrollmentCount = course.data?.enrollmentCount + 1 || 1;
    await this.updateCourseUseCase.execute({
      _id: enrollment.courseId as string,
      enrollmentCount: updatedEnrollmentCount,
    });

    const newEnrollment = await this.enrollmentRepository.add(enrollment);

    const tutor = await UserModel.findById(selectedTutorId);
    tutor?.students.push(newEnrollment.userId as string);
    await tutor?.save();

    return newEnrollment;
  };
}

export default EnrollUserUseCase;
