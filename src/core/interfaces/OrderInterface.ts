import IOrder from "../entities/IOrder";

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
