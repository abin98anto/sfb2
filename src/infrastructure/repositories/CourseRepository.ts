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
    return await Course.findById(_id).lean<ICourse>();
  };

  update = async (updates: Partial<ICourse>): Promise<ICourse | null> => {
    // console.log("upd", updates);
    const existingCourse = await Course.findById(updates._id).exec();
    if (!existingCourse) {
      throw new Error(comments.COURSE_NOT_FOUND);
    }

    const typedCourse = existingCourse.toObject() as ICourse; // Convert to plain object

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== "_id") {
        if (key === "basicInfo") {
          for (const [nestedKey, nestedValue] of Object.entries(
            value as Record<string, unknown>
          )) {
            if (nestedValue !== undefined) {
              typedCourse.basicInfo[nestedKey as keyof ICourse["basicInfo"]] =
                nestedValue as never;
            }
          }
        } else if (key === "curriculum") {
          typedCourse.curriculum = value as ICourse["curriculum"];
        } else {
          (typedCourse as any)[key] = value;
        }
      }
    }

    await Course.updateOne({ _id: updates._id }, typedCourse);
    return typedCourse;
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
