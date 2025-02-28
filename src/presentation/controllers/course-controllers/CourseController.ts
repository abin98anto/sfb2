import { CreateCourseUseCase } from "../../../core/use-cases/course-usecases/CreateCourseUseCase";
import { GetAllCoursesUseCase } from "../../../core/use-cases/course-usecases/GetAllCoursesUseCase";
import { GetCourseDetailsUseCase } from "../../../core/use-cases/course-usecases/GetCourseDetailsUseCase";
import { UpdateCourseUseCase } from "../../../core/use-cases/course-usecases/UpdateCourseUseCase";

import { Request, Response } from "express";
import { comments } from "../../../shared/constants/comments";
import { ICourse } from "../../../core/entities/ICourse";

export class CourseController {
  constructor(
    private createCourseUseCase: CreateCourseUseCase,
    private getCourseDetailsUseCase: GetCourseDetailsUseCase,
    private updateCourseUseCase: UpdateCourseUseCase,
    private getAllCoursesUseCase: GetAllCoursesUseCase
  ) {}

  add = async (req: Request, res: Response): Promise<void> => {
    try {
      const course = req.body;
      const result = this.createCourseUseCase.execute(course);
      res.status(201).json(result);
    } catch (error) {
      console.log(comments.COURSE_ADD_C_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.COURSE_ADD_C_FAIL,
        err: error,
      });
    }
  };

  getCourseDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("the params in course details", req.params);
      const { courseId } = req.params;
      const result = await this.getCourseDetailsUseCase.execute(
        courseId as string
      );
      // console.log("the result in controleler", result);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.COURSE_DETAILS_FETCH_C_FAIL);
      res.status(500).json({
        success: false,
        message: comments.COURSE_DETAILS_FETCH_C_FAIL,
        err: error,
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { body: updates } = req;
      const result = await this.updateCourseUseCase.execute(updates);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.COURSE_UPDATE_C_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.COURSE_UPDATE_C_FAIL,
        err: error,
      });
    }
  };

  getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const result = await this.getAllCoursesUseCase.execute({
        page,
        limit,
        search,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.COURSES_FETCH_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.COURSES_FETCH_FAIL,
        err: error,
      });
    }
  };

  toggleStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const course: ICourse = req.body;
      course.isActive = false;
      const result = this.updateCourseUseCase.execute(course);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.COURSE_TOGGLE_FAIL, error);
      res.status(500).json({
        success: false,
        message: comments.COURSE_TOGGLE_FAIL,
        err: error,
      });
    }
  };
}
