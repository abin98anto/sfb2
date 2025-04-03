import express from "express";
const reviewRouter = express.Router();

import ReviewInterface from "../../core/interfaces/ReviewInterface";
import ReviewRepository from "../../infrastructure/repositories/ReviewRepository";
import CreateReviewUseCase from "../../core/use-cases/review-usecases/CreateReviewUseCase";
import UpdateReviewUseCase from "../../core/use-cases/review-usecases/UpdateReviewUseCase";
import DeleteReviewUseCase from "../../core/use-cases/review-usecases/DeleteReviewUseCase";
import GetCourseReviewsUseCase from "../../core/use-cases/review-usecases/GetCourseReviewsUseCase";
import ReviewController from "../controllers/review-controllers/ReviewController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { UserRole } from "../../core/entities/misc/enums";

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

const userRepository: UserInterface = new UserRepository();
const jwtService = new JwtService();
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);
const authorize = AuthMiddleware.authorize([UserRole.USER]);

reviewRouter.post("/add", authMiddleware, authorize, reviewController.create);
reviewRouter.put("/update", authMiddleware, authorize, reviewController.update);
reviewRouter.delete(
  "/:reviewId",
  authMiddleware,
  authorize,
  reviewController.delete
);
reviewRouter.get(
  "/:courseId",
  authMiddleware,
  authorize,
  reviewController.getCourseReviews
);

export default reviewRouter;
