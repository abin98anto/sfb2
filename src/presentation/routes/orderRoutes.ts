import express from "express";
const orderRouter = express.Router();

import OrderInterface from "../../core/interfaces/OrderInterface";
import OrderRepository from "../../infrastructure/repositories/OrderRepository";
import CreateOrderUseCase from "../../core/use-cases/order-usecases/CreateOrderUseCase";
import GetAllOrderUseCase from "../../core/use-cases/order-usecases/GetAllOrdersUseCase";
import GetUserOrdersUseCase from "../../core/use-cases/order-usecases/GetUserOrdersUseCase";
import OrderController from "../controllers/order-controllers/OrderController";
import { RazorpayController } from "../controllers/order-controllers/RazorpayController";

const orderRepository: OrderInterface = new OrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrderUseCase(orderRepository);
const getUserOrdersUseCase = new GetUserOrdersUseCase(orderRepository);
const orderController = new OrderController(
  createOrderUseCase,
  getUserOrdersUseCase,
  getAllOrdersUseCase
);

const razorpayController = new RazorpayController();

orderRouter.get("/", orderController.getAll);
orderRouter.post("/add", orderController.create);
orderRouter.get("/user/:userId", orderController.getUserOrders);

orderRouter.post("/razorpay/create", razorpayController.createRazorpayOrder);

export default orderRouter;
