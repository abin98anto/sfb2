import { ICategory } from "../entities/ICategory";

export interface CategoryInterface {
  getAll(): Promise<ICategory[]>;
  add(category: ICategory): Promise<ICategory>;
  update(category: ICategory): Promise<ICategory | null>;
  delete(_id: string): Promise<void>;
  getPaginated(params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<any[]>;
  getCount(search: string): Promise<number>;
}
