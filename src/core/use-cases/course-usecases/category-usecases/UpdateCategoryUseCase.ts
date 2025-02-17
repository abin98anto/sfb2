import { comments } from "../../../../shared/constants/comments";
import { ICategory } from "../../../entities/ICategory";
import { UseCaseResponse } from "../../../entities/misc/useCaseResponse";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (category: Partial<ICategory>): Promise<UseCaseResponse> => {
    try {
      const isDuplicate: ICategory | null =
        await this.categoryRepository.findDuplicates(category.name as string);
      if (isDuplicate?._id !== category._id) {
        return { success: false, message: comments.CAT_EXISTS };
      }

      const result = await this.categoryRepository.update(category);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.CAT_UPDATE_FAIL, error);
      return { success: false, message: comments.CAT_UPDATE_FAIL, err: error };
    }
  };
}
