import express from "express";
const subscriptionRoutes = express.Router();

import SubscriptionInterface from "../../core/interfaces/SubscriptionInterface";
import SubscriptionRepository from "../../infrastructure/repositories/SubscriptionRepository";
import GetAllSubscriptionsUseCase from "../../core/use-cases/subscription-usecases/GetAllSubscriptionsUseCase";
import CreateSubscriptionUseCase from "../../core/use-cases/subscription-usecases/CreateSubscriptionUseCase";
import UpdateSubscriptionUseCase from "../../core/use-cases/subscription-usecases/UpdateSubscriptionUseCase";
import SubscriptionController from "../controllers/admin-controllers/SubscriptionController";
import HandleExpiredSubscriptionsUseCase from "../../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { UserRole } from "../../core/entities/misc/enums";

const subscriptionRepository: SubscriptionInterface =
  new SubscriptionRepository();

const getAllUseCase = new GetAllSubscriptionsUseCase(subscriptionRepository);
const createSubscriptionUseCase = new CreateSubscriptionUseCase(
  subscriptionRepository
);
const updateSubscriptionUseCase = new UpdateSubscriptionUseCase(
  subscriptionRepository
);
const handleExpiredSubscriptionsUseCase = new HandleExpiredSubscriptionsUseCase(
  subscriptionRepository
);

const subscriptionController = new SubscriptionController(
  createSubscriptionUseCase,
  updateSubscriptionUseCase,
  getAllUseCase,
  handleExpiredSubscriptionsUseCase
);

const jwtService = new JwtService();
const userRepository: UserInterface = new UserRepository();
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);
const authorize = AuthMiddleware.authorize([UserRole.ADMIN]);

subscriptionRoutes.get("/", subscriptionController.getAll);
subscriptionRoutes.post(
  "/add",
  authMiddleware,
  authorize,
  subscriptionController.create
);
subscriptionRoutes.put(
  "/update",
  authMiddleware,
  authorize,
  subscriptionController.update
);

export default subscriptionRoutes;
