import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    features: {
      type: {
        hasVideoCall: { type: Boolean, required: true },
        hasChat: { type: Boolean, required: true },
        hasCertificate: { type: Boolean, required: true },
      },
      required: true,
      default: { hasVideoCall: false, hasChat: false, hasCertificate: false },
    },
    price: { type: Number },
    discountPrice: { type: Number },
    discountValidity: { type: Date },
    users: [
      {
        userEmail: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
      },
    ],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const SubscriptionModel = mongoose.model("Subscription", SubscriptionSchema);
export default SubscriptionModel;
