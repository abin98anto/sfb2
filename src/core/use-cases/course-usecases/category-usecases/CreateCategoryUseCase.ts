import { comments } from "../../../../shared/constants/comments";
import { ICategory } from "../../../entities/ICategory";
import { UseCaseResponse } from "../../../entities/misc/useCaseResponse";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (category: ICategory): Promise<UseCaseResponse> => {
    try {
      const isDuplicate = await this.categoryRepository.findDuplicates(
        category.name
      );
      if (isDuplicate) {
        return { success: false, message: comments.CAT_EXISTS };
      }

      const result = await this.categoryRepository.add(category);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.CAT_ADD_FAIL, error);
      return { success: false, message: comments.CAT_ADD_FAIL, err: error };
    }
  };
}
