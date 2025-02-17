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
    const result = await CategoryModel.findByIdAndUpdate(
      category._id,
      { $set: category },
      { new: true }
    );
    return result;
  };

  delete = async (_id: string): Promise<void> => {
    await CategoryModel.deleteOne({ _id });
  };

  getPaginated = async ({
    skip,
    limit,
    search,
  }: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<any[]> => {
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    return await CategoryModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  };

  getCount = async (search: string): Promise<number> => {
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    return await CategoryModel.countDocuments(query);
  };
}
