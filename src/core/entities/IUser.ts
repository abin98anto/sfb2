export interface IUser {
  name: string;
  email: string;
  role: string;
  password?: string | null;
  picture?: string;
  wallet?: number;
  isActive?: boolean;
  otp?: string;
  otpExpiry?: Date;
  resume?: string;
  students?: string[];
  isVerified?: boolean;
}
