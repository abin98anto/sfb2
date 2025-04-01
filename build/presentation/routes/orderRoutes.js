"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var orderRouter = express_1.default.Router();
var OrderRepository_1 = __importDefault(require("../../infrastructure/repositories/OrderRepository"));
var CreateOrderUseCase_1 = __importDefault(require("../../core/use-cases/order-usecases/CreateOrderUseCase"));
var GetAllOrdersUseCase_1 = __importDefault(require("../../core/use-cases/order-usecases/GetAllOrdersUseCase"));
var GetUserOrdersUseCase_1 = __importDefault(require("../../core/use-cases/order-usecases/GetUserOrdersUseCase"));
var OrderController_1 = __importDefault(require("../controllers/order-controllers/OrderController"));
var RazorpayController_1 = require("../controllers/order-controllers/RazorpayController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var JwtService_1 = require("../../infrastructure/external-services/JwtService");
var GetUserDetailsUseCase_1 = require("../../core/use-cases/user-usecases/GetUserDetailsUseCase");
var UserRepository_1 = require("../../infrastructure/repositories/UserRepository");
var SubscriptionRepository_1 = __importDefault(require("../../infrastructure/repositories/SubscriptionRepository"));
var NewSubscriberUseCase_1 = __importDefault(require("../../core/use-cases/subscription-usecases/NewSubscriberUseCase"));
var CheckSubscriptionStatusUseCase_1 = __importDefault(require("../../core/use-cases/subscription-usecases/CheckSubscriptionStatusUseCase"));
var orderRepository = new OrderRepository_1.default();
var subscriptionRepository = new SubscriptionRepository_1.default();
var createOrderUseCase = new CreateOrderUseCase_1.default(orderRepository);
var getAllOrdersUseCase = new GetAllOrdersUseCase_1.default(orderRepository);
var getUserOrdersUseCase = new GetUserOrdersUseCase_1.default(orderRepository);
var newSubscriberUseCase = new NewSubscriberUseCase_1.default(subscriptionRepository);
var checkSubscriptionStatusUseCase = new CheckSubscriptionStatusUseCase_1.default(subscriptionRepository);
var orderController = new OrderController_1.default(createOrderUseCase, getUserOrdersUseCase, getAllOrdersUseCase, newSubscriberUseCase, checkSubscriptionStatusUseCase);
var userRepository = new UserRepository_1.UserRepository();
var jwtService = new JwtService_1.JwtService();
var getUserDetailsUseCase = new GetUserDetailsUseCase_1.GetUserDetailsUseCase(userRepository);
var razorpayController = new RazorpayController_1.RazorpayController();
var authMiddleware = authMiddleware_1.AuthMiddleware.create(jwtService, getUserDetailsUseCase);
orderRouter.get("/", orderController.getAll);
orderRouter.post("/add", authMiddleware, orderController.create);
orderRouter.get("/user/:userId", authMiddleware, orderController.getUserOrders);
orderRouter.post("/razorpay/create", authMiddleware, razorpayController.createRazorpayOrder);
orderRouter.get("/sub-check", authMiddleware, orderController.subscriptionCheck);
exports.default = orderRouter;
