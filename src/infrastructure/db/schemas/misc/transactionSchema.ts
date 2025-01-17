import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  amount: { type: Number, default: 0 },
  transactionId: String,
  comment: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  Date: { type: Date, default: Date.now },
});

export const transactionModel = mongoose.model(
  "Transaction",
  transactionSchema
);
