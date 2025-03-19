import IChat from "../../entities/IChat";
import IEnrollment from "../../entities/IEnrollment";
import { IUser } from "../../entities/IUser";
import ChatInterface from "../../interfaces/ChatInterface";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";
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
      throw new Error("No tutors available for this course");
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
      throw new Error("Failed to retrieve tutor information");
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
        // messages: [],
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

    let updatedStudents = [];
    user.students
      ? (updatedStudents = [...user.students, newEnrollment._id as string])
      : (updatedStudents = [newEnrollment._id as string]);

    const userUpdate = await this.updateDetailsUseCase.execute(
      selectedTutorId,
      {
        students: updatedStudents,
      }
    );

    return newEnrollment;
  };
}

export default EnrollUserUseCase;
