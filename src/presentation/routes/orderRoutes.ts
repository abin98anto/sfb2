import express from "express";
const orderRouter = express.Router();

import OrderInterface from "../../core/interfaces/OrderInterface";
import OrderRepository from "../../infrastructure/repositories/OrderRepository";
import CreateOrderUseCase from "../../core/use-cases/order-usecases/CreateOrderUseCase";
import GetAllOrderUseCase from "../../core/use-cases/order-usecases/GetAllOrdersUseCase";
import GetUserOrdersUseCase from "../../core/use-cases/order-usecases/GetUserOrdersUseCase";
import OrderController from "../controllers/order-controllers/OrderController";
import { RazorpayController } from "../controllers/order-controllers/RazorpayController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { JwtService } from "../../infrastructure/external-services/JwtService";
import { GetUserDetailsUseCase } from "../../core/use-cases/user-usecases/GetUserDetailsUseCase";
import { UserInterface } from "../../core/interfaces/UserInterface";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import SubscriptionInterface from "../../core/interfaces/SubscriptionInterface";
import SubscriptionRepository from "../../infrastructure/repositories/SubscriptionRepository";
import NewSubscriberUseCase from "../../core/use-cases/subscription-usecases/NewSubscriberUseCase";
import CheckSubscriptionStatusUseCase from "../../core/use-cases/subscription-usecases/CheckSubscriptionStatusUseCase";

const orderRepository: OrderInterface = new OrderRepository();
const subscriptionRepository: SubscriptionInterface =
  new SubscriptionRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrderUseCase(orderRepository);
const getUserOrdersUseCase = new GetUserOrdersUseCase(orderRepository);
const newSubscriberUseCase = new NewSubscriberUseCase(subscriptionRepository);
const checkSubscriptionStatusUseCase = new CheckSubscriptionStatusUseCase(
  subscriptionRepository
);
const orderController = new OrderController(
  createOrderUseCase,
  getUserOrdersUseCase,
  getAllOrdersUseCase,
  newSubscriberUseCase,
  checkSubscriptionStatusUseCase
);

const userRepository: UserInterface = new UserRepository();
const jwtService = new JwtService();
const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository);

const razorpayController = new RazorpayController();
const authMiddleware = AuthMiddleware.create(jwtService, getUserDetailsUseCase);

orderRouter.get("/", authMiddleware, orderController.getAll);
orderRouter.post("/add", orderController.create);
orderRouter.get("/user/:userId", authMiddleware, orderController.getUserOrders);

orderRouter.post("/razorpay/create", razorpayController.createRazorpayOrder);

orderRouter.get(
  "/sub-check/:email",
  authMiddleware,
  orderController.subscriptionCheck
);

export default orderRouter;
