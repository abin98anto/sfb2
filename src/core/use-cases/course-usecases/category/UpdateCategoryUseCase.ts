import { ICategory } from "../../../entities/ICategory";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (category: ICategory): Promise<ICategory | null> => {
    return await this.categoryRepository.update(category);
  };
}
