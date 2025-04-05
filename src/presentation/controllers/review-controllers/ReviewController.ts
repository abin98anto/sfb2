import { Request, Response } from "express";
import CreateReviewUseCase from "../../../core/use-cases/review-usecases/CreateReviewUseCase";
import UpdateReviewUseCase from "../../../core/use-cases/review-usecases/UpdateReviewUseCase";
import DeleteReviewUseCase from "../../../core/use-cases/review-usecases/DeleteReviewUseCase";
import GetCourseReviewsUseCase from "../../../core/use-cases/review-usecases/GetCourseReviewsUseCase";
import { comments } from "../../../shared/constants/comments";

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
      console.log(comments.REVIEW_ADD_FAIL, error);
      res.status(500).json({ message: comments.REVIEW_ADD_FAIL, err: error });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const review = req.body;
      const result = await this.updateReviewUseCase.execute(review);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.REVIEW_UPDATE_FAIL, error);
      res
        .status(500)
        .json({ message: comments.REVIEW_UPDATE_FAIL, err: error });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const reviewId = req.params.id;
      const result = await this.deleteReviewUseCase.execute(reviewId);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.REVIEW_DELETE_FAIL, error);
      res
        .status(500)
        .json({ message: comments.REVIEW_DELETE_FAIL, err: error });
    }
  };

  getCourseReviews = async (req: Request, res: Response) => {
    try {
      const courseId = req.params.courseId;
      const result = await this.getCourseReviewsUseCase.execute(courseId);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.REVIEWS_FETCH_FAIL, error);
      res
        .status(500)
        .json({ message: comments.REVIEWS_FETCH_FAIL, err: error });
    }
  };
}
