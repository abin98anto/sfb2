import { ICategory } from "../../core/entities/ICategory";
import { CategoryInterface } from "../../core/interfaces/CategoryInterface";
import { CategoryModel } from "../db/schemas/categorySchema";

export class CategoryRepository implements CategoryInterface {
  getAll = async (): Promise<ICategory[]> => {
    return await CategoryModel.find({ isDeleted: false });
  };

  add = async (category: ICategory): Promise<ICategory> => {
    const newCategory = new CategoryModel(category);
    await newCategory.save();
    return newCategory as ICategory;
  };

  update = async (category: Partial<ICategory>): Promise<ICategory | null> => {
    const result = await CategoryModel.findByIdAndUpdate(
      category._id,
      { $set: category },
      { new: true }
    );
    return result;
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
    const query = search
      ? { name: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    return await CategoryModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  };

  getCount = async (search: string): Promise<number> => {
    const query = search
      ? { name: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };

    return await CategoryModel.countDocuments(query);
  };

  findDuplicates = async (name: string): Promise<ICategory | null> => {
    const existingCategory = await CategoryModel.findOne({
      name,
      isDeleted: false,
    });
    return existingCategory;
  };

  findById = async (id: string): Promise<ICategory | null> => {
    return await CategoryModel.findById(id);
  };
}
