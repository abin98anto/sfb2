import { CategoryInterface } from "../../../interfaces/CategoryInterface";

export class RemoveCategoryUseCase {
  constructor(private categoryRepository: CategoryInterface) {}

  execute = async (_id: string): Promise<void> => {
    return await this.categoryRepository.delete(_id);
  };
}
