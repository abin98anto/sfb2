import { ICategory } from "../entities/ICategory";

export interface CategoryInterface {
  getAll(): Promise<ICategory[]>;
  add(category: ICategory): Promise<ICategory>;
  update(category: ICategory): Promise<ICategory | null>;
  delete(_id: string): Promise<void>;
}
