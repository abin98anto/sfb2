import { UserRole } from "./enums";

export interface JwtData {
  _id?: string | null;
  role: UserRole;
}
