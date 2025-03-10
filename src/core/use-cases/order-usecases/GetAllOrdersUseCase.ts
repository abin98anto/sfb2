import { comments } from "../../../shared/constants/comments";
import { PaginationParams } from "../../entities/misc/PaginationParams";
import OrderInterface from "../../interfaces/OrderInterface";

export default class GetAllOrderUseCase {
  constructor(private orderRepository: OrderInterface) {}

  execute = async (params: PaginationParams = {}) => {
    try {
      const { page = 1, limit = 10, search = "" } = params;
      const skip = (page - 1) * limit;

      const totalCount = await this.orderRepository.getCount(search);
      const categories = await this.orderRepository.getPaginated({
        skip,
        limit,
        search,
      });

      const data = {
        data: categories,
        total: totalCount,
        limit,
        page,
        totalPages: Math.ceil(totalCount / limit),
      };

      return { success: true, data };
    } catch (error) {
      console.log(comments.ORDER_FETCH_UC_FAIL, error);
      return {
        success: false,
        message: comments.ORDER_FETCH_UC_FAIL,
        err: error,
      };
    }
  };
}
