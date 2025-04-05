import EnrollmentDetailsUseCase from "../../../core/use-cases/enrollment-usecases/EnrollmentDetailsUseCase";
import EnrollUserUseCase from "../../../core/use-cases/enrollment-usecases/EnrollUserUseCase";
import GetAllUseCase from "../../../core/use-cases/enrollment-usecases/GetAllUseCase";
import GetEnrollmentWithoutIdUseCase from "../../../core/use-cases/enrollment-usecases/GetEnrollmentWithoutIdUseCase";
import UpdateEnrollmentUseCase from "../../../core/use-cases/enrollment-usecases/UpdateEnrollmentUseCase";
import UsersCoursesUseCase from "../../../core/use-cases/enrollment-usecases/UsersCoursesUseCase";

import { Request, Response } from "express";
import { comments } from "../../../shared/constants/comments";
import { IUser } from "../../../core/entities/IUser";

class EnrollmentController {
  constructor(
    private enrollUserUseCase: EnrollUserUseCase,
    private enrollmentDetailsUseCase: EnrollmentDetailsUseCase,
    private getAllUseCase: GetAllUseCase,
    private updateEnrollmentUseCase: UpdateEnrollmentUseCase,
    private usersCoursesUseCase: UsersCoursesUseCase,
    private getEnrollmentWithoutIdUseCase: GetEnrollmentWithoutIdUseCase
  ) {}

  add = async (req: Request, res: Response): Promise<void> => {
    try {
      const enrollment = req.body;
      const result = await this.enrollUserUseCase.execute(
        {
          ...enrollment,
          userId: req.user._id,
        },
        req.user as IUser
      );
      res.status(201).json(result);
    } catch (error) {
      console.log(comments.ENROLL_ADD_FAIL, error);
      res.status(500).json({
        message: comments.ENROLL_ADD_FAIL,
        err: error,
        success: false,
      });
    }
  };

  getDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.enrollmentDetailsUseCase.execute(id);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ENROLL_DETAILS_FAIL, error);
      res.status(500).json({
        message: comments.ENROLL_DETAILS_FAIL,
        err: error,
        success: false,
      });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.getAllUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ENROLL_ALL_FAIL, error);
      res.status(500).json({
        message: comments.ENROLL_ALL_FAIL,
        err: error,
        success: false,
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { updates } = req.body;
      const result = await this.updateEnrollmentUseCase.execute(updates);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ENROLL_UPDATE_FAIL, error);
      res.status(500).json({
        message: comments.ENROLL_UPDATE_FAIL,
        err: error,
        success: false,
      });
    }
  };

  getUserCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.userId;
      const result = await this.usersCoursesUseCase.execute(userId as string);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ENROLL_USER_COURSE_ERR, error);
      res.status(500).json({
        message: comments.ENROLL_USER_COURSE_ERR,
        err: error,
        success: false,
      });
    }
  };

  getWithoutId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user._id as string;
      const { courseId } = req.body;
      const result = await this.getEnrollmentWithoutIdUseCase.execute(
        userId.toString(),
        courseId
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ENROLL_DETAILS2_FAIL, error);
      res.status(500).json({
        message: comments.ENROLL_DETAILS2_FAIL,
        err: error,
        success: false,
      });
    }
  };

  getEnrollments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { courseId, userId } = req.body;
      const result = await this.getEnrollmentWithoutIdUseCase.execute(
        userId,
        courseId
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ENROLL_DETAILS2_FAIL, error);
      res.status(500).json({
        message: comments.ENROLL_DETAILS2_FAIL,
        err: error,
        success: false,
      });
    }
  };
}

export default EnrollmentController;
