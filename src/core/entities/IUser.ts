export interface IUser {
  name: string;
  email: string;
  role: string;
  password?: string | null;
  picture?: string;
  wallet?: number;
  isActive?: boolean;
  otp?: string | null;
  otpExpiry?: Date | null;
  resume?: string;
  students?: string[];
  reviewsTaken?: number;
  sessionsTaken?: number;
  isVerified?: boolean;
  _id?: string;
  refreshToken?: string;
}
