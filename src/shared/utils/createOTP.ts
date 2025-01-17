import { comments } from "../constants/comments";

export const createOTP = (length = 6): { otp: string; expiresAt: Date } => {
  try {
    const otp = Math.random().toString().slice(-length);
    const expiresAt = new Date(Date.now() + 60 * 1000);
    return { otp, expiresAt };
  } catch (error) {
    console.log(comments.OTP_CREATE_FAIL, error);
    return { otp: "", expiresAt: new Date(Date.now()) };
  }
};
