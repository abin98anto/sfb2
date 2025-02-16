import { ICategory } from "../../../entities/ICategory";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (category: ICategory): Promise<ICategory> => {
    return await this.categoryRepository.add(category);
  };
}
