import express from "express";
const enrollmentRoutes = express.Router();

import EnrollUserUseCase from "../../core/use-cases/enrollment-usecases/EnrollUserUseCase";
import EnrollmentRepository from "../../infrastructure/repositories/EnrollmentRepository";
import EnrollmentInterface from "../../core/interfaces/EnrollmentInterface";
import { UpdateCourseUseCase } from "../../core/use-cases/course-usecases/UpdateCourseUseCase";
import { CourseRepository } from "../../infrastructure/repositories/CourseRepository";
import { CourseInterface } from "../../core/interfaces/CourseInterface";
import { GetCourseDetailsUseCase } from "../../core/use-cases/course-usecases/GetCourseDetailsUseCase";
import EnrollmentDetailsUseCase from "../../core/use-cases/enrollment-usecases/EnrollmentDetailsUseCase";
import GetAllUseCase from "../../core/use-cases/enrollment-usecases/GetAllUseCase";
import UpdateEnrollmentUseCase from "../../core/use-cases/enrollment-usecases/UpdateEnrollmentUseCase";
import UsersCoursesUseCase from "../../core/use-cases/enrollment-usecases/UsersCoursesUseCase";
import EnrollmentController from "../controllers/enrollment-controllers/EnrollmentController";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { AuthMiddleware } from "../middleware/authMiddleware";
import GetEnrollmentWithoutIdUseCase from "../../core/use-cases/enrollment-usecases/GetEnrollmentWithoutIdUseCase";
import ChatInterface from "../../core/interfaces/ChatInterface";
import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import { UpdateDetailsUseCase } from "../../core/use-cases/user-usecases/UpdateDetailsUseCase";
import { UserRole } from "../../core/entities/misc/enums";

const enrollmentRepository: EnrollmentInterface = new EnrollmentRepository();
const chatRepository: ChatInterface = new ChatRepository();
const jwtService = new JwtService();
const userRepository: UserInterface = new UserRepository();

const courseRepository: CourseInterface = new CourseRepository();
const updateCourseUseCase = new UpdateCourseUseCase(courseRepository);
const getCourseDetailsUseCase = new GetCourseDetailsUseCase(courseRepository);

const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);
const authorize = AuthMiddleware.authorize([UserRole.USER]);
const updateDetailsUseCase = new UpdateDetailsUseCase(userRepository);

const enrollUserUseCase = new EnrollUserUseCase(
  enrollmentRepository,
  chatRepository,
  updateCourseUseCase,
  getCourseDetailsUseCase,
  getUserDetailsUseCase,
  updateDetailsUseCase
);
const enrollmentDetailsUseCase = new EnrollmentDetailsUseCase(
  enrollmentRepository
);
const getAllUseCase = new GetAllUseCase(enrollmentRepository);
const updateEnrollmentUseCase = new UpdateEnrollmentUseCase(
  enrollmentRepository
);
const getEnrollmentWithoutIdUseCase = new GetEnrollmentWithoutIdUseCase(
  enrollmentRepository
);
const usersCoursesUseCase = new UsersCoursesUseCase(enrollmentRepository);
const enrollmentController = new EnrollmentController(
  enrollUserUseCase,
  enrollmentDetailsUseCase,
  getAllUseCase,
  updateEnrollmentUseCase,
  usersCoursesUseCase,
  getEnrollmentWithoutIdUseCase
);

enrollmentRoutes.post(
  "/add",
  authMiddleware,
  authorize,
  enrollmentController.add
);
enrollmentRoutes.get(
  "/user-enrollments/:userId",
  enrollmentController.getUserCourses
);
enrollmentRoutes.put("/update", enrollmentController.update);
enrollmentRoutes.post(
  "/without-id",
  authMiddleware,
  enrollmentController.getWithoutId
);
enrollmentRoutes.get("/", authMiddleware, enrollmentController.getAll);
enrollmentRoutes.get("/:id", authMiddleware, enrollmentController.getDetails);

enrollmentRoutes.post(
  "/get-enroll-details",
  authMiddleware,
  enrollmentController.getEnrollments
);

export default enrollmentRoutes;
