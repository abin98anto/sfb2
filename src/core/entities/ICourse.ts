import { IUser } from "./IUser";

export interface ILesson {
  _id?: string;
  name: string;
  videoUrl: string;
  pdfUrls: string[];
  duration: number;
}

export interface ISection {
  _id?: string;
  name: string;
  lessons: ILesson[];
  duration: number;
}

export interface ICourse {
  _id?: string;
  title: string;
  subtitle: string;
  category: string;
  topic: string;
  language: string;
  level: string;
  prerequisites: string;
  thumbnail: string;
  description: string;
  curriculum: ISection[];
  tutors?: IUser[];
  totalDuration: number;
  totalLessons: number;
  enrollmentCount: number;
  isActive: Boolean;
}
