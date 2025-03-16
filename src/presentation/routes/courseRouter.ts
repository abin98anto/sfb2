import express from "express";
import { CourseRepository } from "../../infrastructure/repositories/CourseRepository";
import { CreateCourseUseCase } from "../../core/use-cases/course-usecases/CreateCourseUseCase";
import { GetCourseDetailsUseCase } from "../../core/use-cases/course-usecases/GetCourseDetailsUseCase";
import { GetAllCoursesUseCase } from "../../core/use-cases/course-usecases/GetAllCoursesUseCase";
import { CourseController } from "../controllers/course-controllers/CourseController";
import { UpdateCourseUseCase } from "../../core/use-cases/course-usecases/UpdateCourseUseCase";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { AuthMiddleware } from "../middleware/authMiddleware";

const courseRouter = express.Router();
const courseRepository: CourseRepository = new CourseRepository();

const createCourseUseCase = new CreateCourseUseCase(courseRepository);
const getCourseDetailsUseCase = new GetCourseDetailsUseCase(courseRepository);
const updateCourseUseCase = new UpdateCourseUseCase(courseRepository);
const getAllCoursesUseCase = new GetAllCoursesUseCase(courseRepository);

const courseController = new CourseController(
  createCourseUseCase,
  getCourseDetailsUseCase,
  updateCourseUseCase,
  getAllCoursesUseCase
);

const jwtService = new JwtService();
const userRepository: UserInterface = new UserRepository();
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);

courseRouter.get("/", courseController.getCourses);
courseRouter.get("/:courseId", courseController.getCourseDetails);
courseRouter.post("/add", authMiddleware, courseController.add);
courseRouter.put("/update", authMiddleware, courseController.update);
courseRouter.put("/toggle", authMiddleware, courseController.toggleStatus);

export default courseRouter;
