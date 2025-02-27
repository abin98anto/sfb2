import { Request, Response } from "express";

import CreateOrderUseCase from "../../../core/use-cases/order-usecases/CreateOrderUseCase";
import GetUserOrdersUseCase from "../../../core/use-cases/order-usecases/GetUserOrdersUseCase";
import GetAllOrderUseCase from "../../../core/use-cases/order-usecases/GetAllOrdersUseCase";
import SubscriptionInterface from "../../../core/interfaces/SubscriptionInterface";
import { UseCaseResponse } from "../../../core/entities/misc/useCaseResponse";
import NewSubscriberUseCase from "../../../core/use-cases/subscription-usecases/NewSubscriberUseCase";

export default class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getUserOrdersUseCase: GetUserOrdersUseCase,
    private getAllOrdersUseCase: GetAllOrderUseCase,
    private newSubscriberUseCase: NewSubscriberUseCase
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("creating new order", req.body);
      const order = req.body;
      const result: UseCaseResponse = await this.createOrderUseCase.execute({
        ...order,
        userEmail: order.userEmail,
        status: "completed",
      });

      console.log("the result in creatte order controller", order.userEmail);
      // const subData = await this.subscriptionRepository.addUser(
      //   result.data._id as string,
      //   order
      // );
      const subData = await this.newSubscriberUseCase.execute(order);
      console.log("the sub data", subData);
      res.status(200).json(result);
    } catch (error) {
      console.log("error in create order", error);
      res.status(500).json({ message: "error in create order" });
    }
  };

  getUserOrders = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await this.getUserOrdersUseCase.execute(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.getAllOrdersUseCase.execute();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };
}
