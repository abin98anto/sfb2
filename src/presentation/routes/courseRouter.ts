import express from "express";
import { CourseRepository } from "../../infrastructure/repositories/CourseRepository";
import { CreateCourseUseCase } from "../../core/use-cases/course-usecases/CreateCourseUseCase";
import { GetCourseDetailsUseCase } from "../../core/use-cases/course-usecases/GetCourseDetailsUseCase";
import { GetAllCoursesUseCase } from "../../core/use-cases/course-usecases/GetAllCoursesUseCase";
import { CourseController } from "../controllers/course-controllers/CourseController";
import { UpdateCourseUseCase } from "../../core/use-cases/course-usecases/UpdateCourseUseCase";

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

courseRouter.get("/", courseController.getCourses);
courseRouter.get("/:id", courseController.getCourseDetails);
courseRouter.post("/add", courseController.add);
courseRouter.put("/update", courseController.update);
courseRouter.put("/toggle", courseController.toggleStatus);

export default courseRouter;
