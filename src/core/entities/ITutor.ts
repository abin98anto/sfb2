import { IUser } from "./IUser";
import { ratings } from "./misc/ratings";

export interface ITutor extends IUser {
  resume: string;
  ratings: ratings[];
  students: string[];
  isVerified: boolean;
}
