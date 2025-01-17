import mongoose, { Schema } from "mongoose";
import { UserRole } from "../../../core/entities/misc/enums";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, default: UserRole.USER },
  password: String,
  picture: String,
  wallet: Number,
  transactionHistory: { type: Schema.Types.ObjectId, ref: "Transaction" },
  isActive: Boolean,
  otp: Number,
  otpExpiry: Date,
  resume: String,
  ratings: { type: Schema.Types.ObjectId, ref: "Rating" },
  students: [String],
  isVerified: Boolean,
});

export const userModel = mongoose.model("User", userSchema);
