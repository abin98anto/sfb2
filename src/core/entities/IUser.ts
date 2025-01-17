import { UserRole } from "./misc/enums";
import { ratings } from "./misc/ratings";
import { transaction } from "./misc/transaction";

export interface IUser {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  picture?: string;
  wallet?: string;
  transactionsHistory?: transaction[];
  isActive: boolean;
  otp: number;
  otpExpiry: Date;
  resume?: string;
  ratings?: ratings[];
  students?: string[];
  isVerified?: boolean;
}
