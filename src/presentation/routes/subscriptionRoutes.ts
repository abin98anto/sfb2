import express from "express";
const subscriptionRoutes = express.Router();

import SubscriptionInterface from "../../core/interfaces/SubscriptionInterface";
import SubscriptionRepository from "../../infrastructure/repositories/subscriptionRepository";
import GetAllSubscriptionsUseCase from "../../core/use-cases/subscription-usecases/GetAllSubscriptionsUseCase";
import CreateSubscriptionUseCase from "../../core/use-cases/subscription-usecases/CreateSubscriptionUseCase";
import UpdateSubscriptionUseCase from "../../core/use-cases/subscription-usecases/UpdateSubscriptionUseCase";
import NewSubscriberUseCase from "../../core/use-cases/subscription-usecases/NewSubscriberUseCase";
import SubscriptionController from "../controllers/admin-controllers/SubscriptionController";

const subscriptionRepository: SubscriptionInterface =
  new SubscriptionRepository();

const getAllUseCase = new GetAllSubscriptionsUseCase(subscriptionRepository);
const createSubscriptionUseCase = new CreateSubscriptionUseCase(
  subscriptionRepository
);
const updateSubscriptionUseCase = new UpdateSubscriptionUseCase(
  subscriptionRepository
);
const newSubscriberUseCase = new NewSubscriberUseCase(subscriptionRepository);

const subscriptionController = new SubscriptionController(
  createSubscriptionUseCase,
  updateSubscriptionUseCase,
  getAllUseCase,
  newSubscriberUseCase
);

subscriptionRoutes.get("/", subscriptionController.getAll);
subscriptionRoutes.post("/add", subscriptionController.create);
subscriptionRoutes.put("/update", subscriptionController.update);
subscriptionRoutes.put("/new-subscriber", subscriptionController.addSubscriber);

export default subscriptionRoutes;
