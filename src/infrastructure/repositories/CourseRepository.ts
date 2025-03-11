import { ICourse } from "../../core/entities/ICourse";
import IParams from "../../core/entities/misc/IParams";
// import IParams from "../../core/entities/misc/IParams";
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
    return await Course.findById(_id).populate("category").lean<ICourse>();
  };

  update = async (updates: Partial<ICourse>): Promise<ICourse | null> => {
    const existingCourse = await Course.findById(updates._id).exec();
    if (!existingCourse) {
      throw new Error(comments.COURSE_NOT_FOUND);
    }

    const typedCourse = existingCourse.toObject() as ICourse;

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && key !== "_id") {
        if (key === "curriculum") {
          typedCourse.curriculum = value as ICourse["curriculum"];
        } else if (key === "tutors") {
          typedCourse.tutors = value as ICourse["tutors"];
        } else {
          (typedCourse as any)[key] = value;
        }
      }
    }

    await Course.updateOne({ _id: updates._id }, typedCourse);
    return typedCourse;
  };

  getAll = async (): Promise<ICourse[]> => {
    return await Course.find().populate([
      {
        path: "tutors",
        select: "_id name",
      },
      {
        path: "category",
        select: "_id name",
      },
    ]);
  };

  getPaginated = async ({
    skip,
    limit,
    search,
    category,
    sort,
  }: IParams): Promise<ICourse[]> => {
    // Create initial query
    let query: any = {};

    // Add search condition if provided
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Add category filter if provided
    if (category && category !== "All") {
      query.category = category;
    }

    // Determine sort order
    let sortOrder: any = { createdAt: -1 }; // Default to newest first

    if (sort === "oldest") {
      sortOrder = { createdAt: 1 };
    }

    return await Course.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOrder)
      .populate([
        {
          path: "tutors",
          select: "_id name",
        },
        {
          path: "category",
          select: "_id name",
        },
      ]);
  };

  getCount = async (search: string, category?: string): Promise<number> => {
    // Create initial query
    let query: any = {};

    // Add search condition if provided
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Add category filter if provided
    if (category && category !== "All") {
      query.category = category;
    }

    return await Course.countDocuments(query);
  };
}
