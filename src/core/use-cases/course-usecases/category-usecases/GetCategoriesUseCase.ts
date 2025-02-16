import { comments } from "../../../../shared/constants/comments";
import { ICategory } from "../../../entities/ICategory";
import { UseCaseResponse } from "../../../entities/misc/useCaseResponse";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (): Promise<UseCaseResponse> => {
    try {
      const result = await this.categoryRepository.getAll();
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.CAT_FETCH_FAIL, error);
      return { success: false, message: comments.CAT_FETCH_FAIL, err: error };
    }
  };
}
