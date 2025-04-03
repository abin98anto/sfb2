import { Request, Response } from "express";

import CreateOrderUseCase from "../../../core/use-cases/order-usecases/CreateOrderUseCase";
import GetUserOrdersUseCase from "../../../core/use-cases/order-usecases/GetUserOrdersUseCase";
import GetAllOrderUseCase from "../../../core/use-cases/order-usecases/GetAllOrdersUseCase";
import NewSubscriberUseCase from "../../../core/use-cases/subscription-usecases/NewSubscriberUseCase";
import CheckSubscriptionStatusUseCase from "../../../core/use-cases/subscription-usecases/CheckSubscriptionStatusUseCase";
import { UseCaseResponse } from "../../../core/entities/misc/useCaseResponse";
import { EnrollStatus } from "../../../core/entities/misc/enums";
import { comments } from "../../../shared/constants/comments";

class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getUserOrdersUseCase: GetUserOrdersUseCase,
    private getAllOrdersUseCase: GetAllOrderUseCase,
    private newSubscriberUseCase: NewSubscriberUseCase,
    private checkSubscriptionStatusUseCase: CheckSubscriptionStatusUseCase
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const order = req.body;
      const result: UseCaseResponse = await this.createOrderUseCase.execute({
        ...order,
        userEmail: order.userEmail,
        status: EnrollStatus.COMPLETED,
      });

      await this.newSubscriberUseCase.execute(order);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ORDER_ADD_FAIL, error);
      res.status(500).json({
        success: false,
        error: error,
        message: comments.ORDER_ADD_FAIL,
      });
    }
  };

  getUserOrders = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await this.getUserOrdersUseCase.execute(userId);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ORDER_USER_FETCH_FAIL, error);
      res.status(500).json({
        success: false,
        error: error,
        message: comments.ORDER_USER_FETCH_FAIL,
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.getAllOrdersUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.ORDER_ALL_FETCH_FAIL, error);
      res.status(500).json({
        success: false,
        error: error,
        message: comments.ORDER_ALL_FETCH_FAIL,
      });
    }
  };

  subscriptionCheck = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      console.log("subcheck", email);
      const result = await this.checkSubscriptionStatusUseCase.execute(email);
      res.status(200).json(result);
    } catch (error) {
      console.log(comments.SUB_CHECK_FAIL, error);
      res.status(500).json({
        success: false,
        error: error,
        message: comments.SUB_CHECK_FAIL,
      });
    }
  };
}

export default OrderController;
