import { ICourse } from "../entities/ICourse";

export interface CourseInterface {
  add(course: Partial<ICourse>): Promise<ICourse>;
  getById(_id: string): Promise<ICourse | null>;
  update(updates: Partial<ICourse>): Promise<ICourse | null>;
  getAll(): Promise<ICourse[]>;

  getPaginated(params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<any[]>;
  getCount(search: string): Promise<number>;
}
