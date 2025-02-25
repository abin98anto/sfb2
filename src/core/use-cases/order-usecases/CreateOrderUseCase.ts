import IOrder from "../../entities/IOrder";
import OrderInterface from "../../interfaces/OrderInterface";

export default class CreateOrderUseCase {
  constructor(private orderRepository: OrderInterface) {}

  execute = async (order: IOrder): Promise<IOrder> => {
    return await this.orderRepository.add(order);
  };
}
