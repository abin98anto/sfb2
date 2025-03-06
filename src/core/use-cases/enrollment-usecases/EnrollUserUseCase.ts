// import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import IChat from "../../entities/IChat";
import IEnrollment from "../../entities/IEnrollment";
import { IUser } from "../../entities/IUser";
import ChatInterface from "../../interfaces/ChatInterface";
import EnrollmentInterface from "../../interfaces/EnrollmentInterface";
import CreateChatUseCase from "../chat-usecases/CreateChatUseCase";
import FindChatUseCase from "../chat-usecases/FindChatUseCase";
import { GetCourseDetailsUseCase } from "../course-usecases/GetCourseDetailsUseCase";
import { UpdateCourseUseCase } from "../course-usecases/UpdateCourseUseCase";
import { GetUserDetailsUseCase } from "../user-usecases/GetUserDetailsUseCase";
import { UpdateDetailsUseCase } from "../user-usecases/UpdateDetailsUseCase";
// import GetEnrollmentWithoutIdUseCase from "./GetEnrollmentWithoutIdUseCase";

class EnrollUserUseCase {
  constructor(
    private enrollmentRepository: EnrollmentInterface,
    private chatRepository: ChatInterface,
    // private getEnrollmentWithoutIdUseCase: GetEnrollmentWithoutIdUseCase,
    private updateCourseUseCase: UpdateCourseUseCase,
    private getCourseDetailsUseCase: GetCourseDetailsUseCase,
    // private findChatUseCase: FindChatUseCase,
    // private createChatUseCase: CreateChatUseCase,
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
    // const existingEnrollment = await this.getEnrollmentWithoutIdUseCase.execute(
    //   enrollment.userId as string,
    //   enrollment.courseId as string
    // );
    if (existingEnrollment) {
      return existingEnrollment;
    }

    // Check if course has tutors
    if (!course?.tutors || course.tutors.length === 0) {
      throw new Error("No tutors available for this course");
    }

    // Get tutor details to check their student counts
    const tutorStudentCounts = [];
    for (const tutorId of course.tutors) {
      const { data: tutorData } = await this.getUserDetailsUseCase.execute(
        tutorId.toString()
      );
      const studentCount = tutorData?.students?.length || 0;
      tutorStudentCounts.push({ tutorId: tutorId.toString(), studentCount });
    }

    // Find the tutor with the lowest number of students
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
        messages: [],
      };

      await this.chatRepository.createChat(newRoom);
      // await this.createChatUseCase.execute(newRoom);
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

    // console.log("the updated stude", updatedStudents);
    const userUpdate = await this.updateDetailsUseCase.execute(
      selectedTutorId,
      {
        students: updatedStudents,
      }
    );
    // console.log("thesuser updated", userUpdate);

    return newEnrollment;
  };
}

export default EnrollUserUseCase;
