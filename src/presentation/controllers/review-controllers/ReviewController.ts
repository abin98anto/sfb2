import { Request, Response } from "express";
import CreateReviewUseCase from "../../../core/use-cases/review-usecases/CreateReviewUseCase";
import UpdateReviewUseCase from "../../../core/use-cases/review-usecases/UpdateReviewUseCase";
import DeleteReviewUseCase from "../../../core/use-cases/review-usecases/DeleteReviewUseCase";
import GetCourseReviewsUseCase from "../../../core/use-cases/review-usecases/GetCourseReviewsUseCase";

export default class ReviewController {
  constructor(
    private createReviewUseCase: CreateReviewUseCase,
    private updateReviewUseCase: UpdateReviewUseCase,
    private deleteReviewUseCase: DeleteReviewUseCase,
    private getCourseReviewsUseCase: GetCourseReviewsUseCase
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const review = req.body;
      const result = await this.createReviewUseCase.execute(review);
      res.status(201).json(result);
    } catch (error) {
      console.log("error in creating review", error);
      res.status(500).json({ message: "error in creating review", err: error });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const review = req.body;
      const result = await this.updateReviewUseCase.execute(review);
      res.status(200).json(result);
    } catch (error) {
      console.log("error in updating review", error);
      res.status(500).json({ message: "error in updating review", err: error });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const reviewId = req.params.id;
      const result = await this.deleteReviewUseCase.execute(reviewId);
      res.status(200).json(result);
    } catch (error) {
      console.log("error in deleting review", error);
      res.status(500).json({ message: "error in deleting review", err: error });
    }
  };

  getCourseReviews = async (req: Request, res: Response) => {
    try {
      const courseId = req.params.courseId;
      const result = await this.getCourseReviewsUseCase.execute(courseId);
      res.status(200).json(result);
    } catch (error) {
      console.log("error in getting course reviews", error);
      res
        .status(500)
        .json({ message: "error in getting course reviews", err: error });
    }
  };
}
