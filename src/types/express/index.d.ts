import { IUser } from "../../core/entities/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
