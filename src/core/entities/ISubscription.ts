import mongoose from "mongoose";

interface ISubscription {
  name: string;
  features: {
    hasVideoCall: boolean;
    hasChat: boolean;
    hasCertificate: boolean;
  };
  price?: number;
  discountPrice?: number;
  discountValidity?: Date;
  users: Array<{
    userId: string;
    startDate: Date;
    endDate?: Date;
  }>;
  isActive: boolean;
  isDeleted: boolean;
  _id?: string | mongoose.Types.ObjectId;
}

export default ISubscription;
