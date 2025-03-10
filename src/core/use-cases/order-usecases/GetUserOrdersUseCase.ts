import { comments } from "../../../shared/constants/comments";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import OrderInterface from "../../interfaces/OrderInterface";

class GetUserOrdersUseCase {
  constructor(private orderRepository: OrderInterface) {}

  execute = async (userId: string): Promise<UseCaseResponse> => {
    try {
      const data = await this.orderRepository.userOrderHistory(userId);
      return { success: true, data };
    } catch (error) {
      console.log(comments.USER_ORDERS_FETCH_UC_FAIL, error);
      return {
        success: false,
        message: comments.USER_ORDERS_FETCH_UC_FAIL,
        err: error,
      };
    }
  };
}

export default GetUserOrdersUseCase;
