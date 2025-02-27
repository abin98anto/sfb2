import IOrder from "../../entities/IOrder";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import OrderInterface from "../../interfaces/OrderInterface";

export default class CreateOrderUseCase {
  constructor(private orderRepository: OrderInterface) {}

  execute = async (order: IOrder): Promise<UseCaseResponse> => {
    // console.log("the order", order);
    const data = await this.orderRepository.add(order);
    return { success: true, data };
  };
}
