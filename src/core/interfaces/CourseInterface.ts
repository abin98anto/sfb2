import { ICourse } from "../entities/ICourse";
import IParams from "../entities/misc/IParams";

export interface CourseInterface {
  add(course: Partial<ICourse>): Promise<ICourse>;
  getById(_id: string): Promise<ICourse | null>;
  update(updates: Partial<ICourse>): Promise<ICourse | null>;
  getAll(): Promise<ICourse[]>;

  getPaginated(params: IParams): Promise<ICourse[]>;
  getCount(search: string): Promise<number>;
}
