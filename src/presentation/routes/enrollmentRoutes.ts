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

const enrollmentRepository: EnrollmentInterface = new EnrollmentRepository();

const courseRepository: CourseInterface = new CourseRepository();
const updateCourseUseCase = new UpdateCourseUseCase(courseRepository);
const getCourseDetailsUseCase = new GetCourseDetailsUseCase(courseRepository);

const enrollUserUseCase = new EnrollUserUseCase(
  enrollmentRepository,
  updateCourseUseCase,
  getCourseDetailsUseCase
);
const enrollmentDetailsUseCase = new EnrollmentDetailsUseCase(
  enrollmentRepository
);
const getAllUseCase = new GetAllUseCase(enrollmentRepository);
const updateEnrollmentUseCase = new UpdateEnrollmentUseCase(
  enrollmentRepository
);
const usersCoursesUseCase = new UsersCoursesUseCase(enrollmentRepository);
const enrollmentController = new EnrollmentController(
  enrollUserUseCase,
  enrollmentDetailsUseCase,
  getAllUseCase,
  updateEnrollmentUseCase,
  usersCoursesUseCase
);

const jwtService = new JwtService();
const userRepository: UserInterface = new UserRepository();
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);

enrollmentRoutes.get("/", enrollmentController.getAll);
enrollmentRoutes.get("/:id", enrollmentController.getDetails);
enrollmentRoutes.post("/add", authMiddleware, enrollmentController.add);
enrollmentRoutes.get(
  "/user-enrollments/:id",
  enrollmentController.getUserCourses
);
enrollmentRoutes.put("/update", enrollmentController.update);

export default enrollmentRoutes;
