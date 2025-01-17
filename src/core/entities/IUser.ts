export interface IUser {
  name: string;
  email: string;
  role: string;
  password?: string | null;
  picture?: string;
  wallet?: number;
  isActive: boolean;
  otp: string;
  otpExpiry: Date;
  resume?: string;
  ratings?: String;
  students?: string[];
  isVerified?: boolean;
}
