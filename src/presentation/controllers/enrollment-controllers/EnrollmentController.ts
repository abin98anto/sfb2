import EnrollmentDetailsUseCase from "../../../core/use-cases/enrollment-usecases/EnrollmentDetailsUseCase";
import EnrollUserUseCase from "../../../core/use-cases/enrollment-usecases/EnrollUserUseCase";
import GetAllUseCase from "../../../core/use-cases/enrollment-usecases/GetAllUseCase";
import UpdateEnrollmentUseCase from "../../../core/use-cases/enrollment-usecases/UpdateEnrollmentUseCase";
import UsersCoursesUseCase from "../../../core/use-cases/enrollment-usecases/UsersCoursesUseCase";

import { Request, Response } from "express";

class EnrollmentController {
  constructor(
    private enrollUserUseCase: EnrollUserUseCase,
    private enrollmentDetailsUseCase: EnrollmentDetailsUseCase,
    private getAllUseCase: GetAllUseCase,
    private updateEnrollmentUseCase: UpdateEnrollmentUseCase,
    private usersCoursesUseCase: UsersCoursesUseCase
  ) {}

  add = async (req: Request, res: Response): Promise<void> => {
    try {
      const enrollment = req.body;
      const result = await this.enrollUserUseCase.execute(enrollment);
      res.status(201).json(result);
    } catch (error) {
      console.log("error enrolling in controller", error);
      res.status(500).json({
        message: "error enrolling in controller",
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
      console.log("error getting details in controller", error);
      res.status(500).json({
        message: "error getting details in controller",
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
      console.log("error getting all in controller", error);
      res.status(500).json({
        message: "error getting all in controller",
        err: error,
        success: false,
      });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const enrollment = req.body;
      const result = await this.updateEnrollmentUseCase.execute(enrollment);
      res.status(200).json(result);
    } catch (error) {
      console.log("error updating in controller", error);
      res.status(500).json({
        message: "error updating in controller",
        err: error,
        success: false,
      });
    }
  };

  getUserCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const result = await this.usersCoursesUseCase.execute(userId);
      res.status(200).json(result);
    } catch (error) {
      console.log("error getting user's courses in controller", error);
      res.status(500).json({
        message: "error getting user's courses in controller",
        err: error,
        success: false,
      });
    }
  };
}

export default EnrollmentController;
