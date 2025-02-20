import { IUser } from "./IUser";

export interface ILesson {
  name: string;
  videoUrl: string;
  pdfUrls: string[];
  duration: number;
}

export interface ISection {
  name: string;
  lessons: ILesson[];
  // description: string;
}

export interface ICourse {
  _id?: string;
  basicInfo: {
    title: string;
    subtitle: string;
    category: string;
    topic: string;
    language: string;
    level: string;
    prerequisites: string;
    thumbnail: string;
    description: string;
  };
  curriculum: ISection[];
  tutors?: IUser[];
  totalDuration: number;
  totalLessons: number;
  enrollmentCount: number;
  isActive: Boolean;
}
