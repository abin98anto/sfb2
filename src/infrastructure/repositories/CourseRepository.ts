import { ICourse } from "../../core/entities/ICourse";
import { CourseInterface } from "../../core/interfaces/CourseInterface";
import { comments } from "../../shared/constants/comments";
import { Course } from "../db/schemas/courseSchema";

export class CourseRepository implements CourseInterface {
  add = async (course: Partial<ICourse>): Promise<ICourse> => {
    const newCourse = new Course(course);
    await newCourse.save();
    return newCourse;
  };

  getById = async (_id: string): Promise<ICourse | null> => {
    return await Course.findById(_id);
  };

  update = async (updates: Partial<ICourse>): Promise<ICourse | null> => {
    const existingCourse = await Course.findById(updates._id).exec();
    if (!existingCourse) {
      throw new Error(comments.COURSE_NOT_FOUND);
    }

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== "_id") {
        if (key === "basicInfo" || key === "advanceInfo") {
          for (const [nestedKey, nestedValue] of Object.entries(
            value as Record<string, unknown>
          )) {
            if (nestedValue !== undefined) {
              (existingCourse[key] as any)[nestedKey] = nestedValue;
            }
          }
        } else if (key === "curriculum") {
          existingCourse.curriculum = value as ICourse["curriculum"];
        } else {
          (existingCourse as any)[key] = value;
        }
      }
    }

    return await existingCourse.save();
  };

  getAll = async (): Promise<ICourse[]> => {
    return await Course.find();
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

    return await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  };

  getCount = async (search: string): Promise<number> => {
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    return await Course.countDocuments(query);
  };
}
