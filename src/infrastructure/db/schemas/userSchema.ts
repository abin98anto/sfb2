import mongoose, { Schema } from "mongoose";
import { UserRole } from "../../../core/entities/misc/enums";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: UserRole.USER,
  },
  password: { type: String, default: undefined },
  picture: { type: String, default: "" },
  wallet: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  otp: { type: String, default: "111111" },
  otpExpiry: { type: Date, default: Date.now },
  resume: { type: String, default: "" },
  ratings: { type: String, default: "" },
  students: [String],
  isVerified: { type: Boolean, default: false },
});

export const UserModel = mongoose.model("User", userSchema);
