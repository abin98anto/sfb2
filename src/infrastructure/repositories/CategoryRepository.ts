import { ICategory } from "../../core/entities/ICategory";
import { CategoryInterface } from "../../core/interfaces/CategoryInterface";
import { CategoryModel } from "../db/schemas/categorySchema";

export class CategoryRepository implements CategoryInterface {
  getAll = async (): Promise<ICategory[]> => {
    return await CategoryModel.find();
  };

  add = async (category: ICategory): Promise<ICategory> => {
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return newCategory as ICategory;
  };

  update = async (category: ICategory): Promise<ICategory | null> => {
    return await CategoryModel.findByIdAndUpdate(
      category.id,
      { $set: category },
      { new: true }
    );
  };

  delete = async (_id: string): Promise<void> => {
    await CategoryModel.deleteOne({ _id });
  };
}
