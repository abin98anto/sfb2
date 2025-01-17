import { UserRole } from "./misc/enums";
import { transaction } from "./misc/transaction";

export interface IUser {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  picture?: string;
  wallet?: string;
  transactionsHistory: transaction[];
  isActive: boolean;
  otp: number;
  otpExpiry: Date;
}
