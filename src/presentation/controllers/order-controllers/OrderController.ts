import { Request, Response } from "express";

import CreateOrderUseCase from "../../../core/use-cases/order-usecases/CreateOrderUseCase";
import GetUserOrdersUseCase from "../../../core/use-cases/order-usecases/GetUserOrdersUseCase";
import GetAllOrderUseCase from "../../../core/use-cases/order-usecases/GetAllOrdersUseCase";

export default class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getUserOrdersUseCase: GetUserOrdersUseCase,
    private getAllOrdersUseCase: GetAllOrderUseCase
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const order = req.body;
      const result = await this.createOrderUseCase.execute({
        ...order,
        status: "completed",
      });
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
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.getAllOrdersUseCase.execute();
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  };
}
