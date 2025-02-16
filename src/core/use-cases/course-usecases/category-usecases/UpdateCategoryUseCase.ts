import { comments } from "../../../../shared/constants/comments";
import { ICategory } from "../../../entities/ICategory";
import { UseCaseResponse } from "../../../entities/misc/useCaseResponse";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (category: ICategory): Promise<UseCaseResponse> => {
    try {
      const result = await this.categoryRepository.update(category);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.CAT_UPDATE_FAIL, error);
      return { success: false, message: comments.CAT_UPDATE_FAIL, err: error };
    }
  };
}
