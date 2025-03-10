import { comments } from "../../../shared/constants/comments";
import IOrder from "../../entities/IOrder";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import OrderInterface from "../../interfaces/OrderInterface";

class CreateOrderUseCase {
  constructor(private orderRepository: OrderInterface) {}

  execute = async (order: IOrder): Promise<UseCaseResponse> => {
    try {
      const data = await this.orderRepository.add(order);
      return { success: true, data };
    } catch (error) {
      console.log(comments.ENROLL_CREATE_UC_FAIL, error);
      return {
        success: false,
        message: comments.ENROLL_CREATE_UC_FAIL,
        err: error,
      };
    }
  };
}

export default CreateOrderUseCase;
