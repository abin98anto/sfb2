import { ICategory } from "../entities/ICategory";

export interface CategoryInterface {
  getAll(): Promise<ICategory[]>;
  add(category: ICategory): Promise<ICategory>;
  update(category: Partial<ICategory>): Promise<ICategory | null>;
  getPaginated(params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<any[]>;
  getCount(search: string): Promise<number>;
  findDuplicates(name: string): Promise<ICategory | null>;
}
