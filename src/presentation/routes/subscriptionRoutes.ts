import express from "express";
const subscriptionRoutes = express.Router();

import SubscriptionInterface from "../../core/interfaces/SubscriptionInterface";
import SubscriptionRepository from "../../infrastructure/repositories/SubscriptionRepository";
import GetAllSubscriptionsUseCase from "../../core/use-cases/subscription-usecases/GetAllSubscriptionsUseCase";
import CreateSubscriptionUseCase from "../../core/use-cases/subscription-usecases/CreateSubscriptionUseCase";
import UpdateSubscriptionUseCase from "../../core/use-cases/subscription-usecases/UpdateSubscriptionUseCase";
import SubscriptionController from "../controllers/admin-controllers/SubscriptionController";
import HandleExpiredSubscriptionsUseCase from "../../core/use-cases/subscription-usecases/HandleExpiredSubscriptionsUseCase";

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

subscriptionRoutes.get("/", subscriptionController.getAll);
subscriptionRoutes.post("/add", subscriptionController.create);
subscriptionRoutes.put("/update", subscriptionController.update);

export default subscriptionRoutes;
