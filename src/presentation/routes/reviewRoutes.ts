import express from "express";
const reviewRouter = express.Router();

import ReviewInterface from "../../core/interfaces/ReviewInterface";
import ReviewRepository from "../../infrastructure/repositories/ReviewRepository";
import CreateReviewUseCase from "../../core/use-cases/review-usecases/CreateReviewUseCase";
import UpdateReviewUseCase from "../../core/use-cases/review-usecases/UpdateReviewUseCase";
import DeleteReviewUseCase from "../../core/use-cases/review-usecases/DeleteReviewUseCase";
import GetCourseReviewsUseCase from "../../core/use-cases/review-usecases/GetCourseReviewsUseCase";
import ReviewController from "../controllers/review-controllers/ReviewController";

const reviewRepository: ReviewInterface = new ReviewRepository();
const createReviewUseCase = new CreateReviewUseCase(reviewRepository);
const updateReviewUseCase = new UpdateReviewUseCase(reviewRepository);
const deleteReviewUseCase = new DeleteReviewUseCase(reviewRepository);
const getCourseReviewsUseCase = new GetCourseReviewsUseCase(reviewRepository);
const reviewController = new ReviewController(
  createReviewUseCase,
  updateReviewUseCase,
  deleteReviewUseCase,
  getCourseReviewsUseCase
);

reviewRouter.post("/add", reviewController.create);
reviewRouter.put("/update", reviewController.update);
reviewRouter.delete("/:reviewId", reviewController.delete);
reviewRouter.get("/:courseId", reviewController.getCourseReviews);

export default reviewRouter;
