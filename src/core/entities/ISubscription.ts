import mongoose from "mongoose";

export interface IUserSubsDetail {
  userEmail: string;
  startDate: Date;
  endDate?: Date;
}

interface ISubscription {
  name: string;
  description: string;
  features: {
    hasVideoCall: boolean;
    hasChat: boolean;
    hasCertificate: boolean;
  };
  price?: number;
  discountPrice?: number;
  discountStartDate?: Date;
  discountValidity?: Date;
  users: Array<IUserSubsDetail>;
  isActive: boolean;
  isDeleted: boolean;
  _id?: string | mongoose.Types.ObjectId;
}

export default ISubscription;
