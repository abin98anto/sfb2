import { PaginationParams } from "../../entities/misc/PaginationParams";
import { UseCaseResponse } from "../../entities/misc/useCaseResponse";
import SubscriptionInterface from "../../interfaces/SubscriptionInterface";

export default class GetAllSubscriptionsUseCase {
  constructor(private subscriptionRepository: SubscriptionInterface) {}
  execute = async (params: PaginationParams = {}): Promise<UseCaseResponse> => {
    try {
      const { page = 1, limit = 10, search = "" } = params;
      const skip = (page - 1) * limit;

      const totalCount = await this.subscriptionRepository.getCount(search);
      const categories = await this.subscriptionRepository.getPaginated({
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
      console.log("error in get all subscription usecase", error);
      return {
        success: false,
        message: "error in get all subscription usecase",
        err: error,
      };
    }
  };
}
