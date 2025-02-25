import IOrder from "../../core/entities/IOrder";
import OrderInterface from "../../core/interfaces/OrderInterface";
import OrderModel from "../db/schemas/orderSchema";

export default class OrderRepository implements OrderInterface {
  add = async (order: IOrder): Promise<IOrder> => {
    const newOrder = new OrderModel(order);
    await newOrder.save();
    return newOrder;
  };

  findAll = async (): Promise<IOrder[] | null> => {
    return await OrderModel.find();
  };

  userOrderHistory = async (userId: string): Promise<IOrder[] | null> => {
    return await OrderModel.find({ userId });
  };

  getPaginated = async (params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<IOrder[]> => {
    const query = params.search
      ? { name: { $regex: params.search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    return await OrderModel.find(query).skip(params.skip).limit(params.limit);
  };

  getCount = async (search: string): Promise<number> => {
    const query = search
      ? { name: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    return await OrderModel.countDocuments(query);
  };
}
