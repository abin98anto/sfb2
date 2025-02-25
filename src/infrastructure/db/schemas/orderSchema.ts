import mongoose, { Schema } from "mongoose";
import IOrder from "../../../core/entities/IOrder";

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    plan: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
