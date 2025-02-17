import { comments } from "../../../../shared/constants/comments";
import { UseCaseResponse } from "../../../entities/misc/useCaseResponse";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (params: PaginationParams = {}): Promise<UseCaseResponse> => {
    try {
      const { page = 1, limit = 10, search = "" } = params;

      // Calculate skip value for pagination
      const skip = (page - 1) * limit;

      // Get total count of categories (considering search)
      const totalCount = await this.categoryRepository.getCount(search);

      // Get paginated and filtered results
      const categories = await this.categoryRepository.getPaginated({
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
      console.log(comments.CAT_FETCH_FAIL, error);
      return { success: false, message: comments.CAT_FETCH_FAIL, err: error };
    }
  };
}
