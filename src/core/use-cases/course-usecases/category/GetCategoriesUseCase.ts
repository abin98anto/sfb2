import { ICategory } from "../../../entities/ICategory";
import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (): Promise<ICategory[]> => {
    return await this.categoryRepository.getAll();
  };
}
