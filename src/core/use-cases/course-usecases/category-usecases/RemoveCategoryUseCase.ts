import { comments } from "../../../../shared/constants/comments";
import { UseCaseResponse } from "../../../entities/misc/useCaseResponse";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class RemoveCategoryUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (_id: string): Promise<UseCaseResponse> => {
    try {
      const result = await this.categoryRepository.delete(_id);
      return { success: true, data: result };
    } catch (error) {
      console.log(comments.CAT_DELETE_FAIL, error);
      return { success: false, message: comments.CAT_DELETE_FAIL, err: error };
    }
  };
}
