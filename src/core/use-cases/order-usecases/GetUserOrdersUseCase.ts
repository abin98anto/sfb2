import OrderInterface from "../../interfaces/OrderInterface";

export default class GetUserOrdersUseCase {
  constructor(private orderRepository: OrderInterface) {}

  execute = async (userId: string) => {
    return await this.orderRepository.userOrderHistory(userId);
  };
}
