import IOrder from "../entities/IOrder";
import IParams from "../entities/misc/IParams";

export default interface OrderInterface {
  add(order: IOrder): Promise<IOrder>;
  findAll(): Promise<IOrder[] | null>;
  userOrderHistory(userId: string): Promise<IOrder[] | null>;

  getPaginated(params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<IOrder[]>;
  getCount(search: string): Promise<number>;
}
