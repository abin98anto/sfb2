import IOrder from "../../core/entities/IOrder";
import ISubscription, {
  IUserSubsDetail,
} from "../../core/entities/ISubscription";
import SubscriptionInterface from "../../core/interfaces/SubscriptionInterface";
import SubscriptionModel from "../db/schemas/subscriptionSchema";
import { UserModel } from "../db/schemas/userSchema";

export default class SubscriptionRepository implements SubscriptionInterface {
  add = async (data: ISubscription): Promise<ISubscription> => {
    const newSubscription = new SubscriptionModel(data);
    await newSubscription.save();
    return newSubscription as ISubscription;
  };

  findDuplicates = async (name: string): Promise<ISubscription> => {
    return (await SubscriptionModel.findOne({
      name,
      isDeleted: false,
    })) as ISubscription;
  };

  findById = async (id: string): Promise<ISubscription> => {
    return (await SubscriptionModel.findOne({
      isDeleted: false,
      _id: id,
    })) as ISubscription;
  };

  getAll = async (): Promise<ISubscription[]> => {
    return await SubscriptionModel.find({ isDeleted: false });
  };

  update = async (data: Partial<ISubscription>): Promise<ISubscription> => {
    return (await SubscriptionModel.findByIdAndUpdate(
      data._id,
      { $set: data },
      { new: true }
    )) as ISubscription;
  };

  addUser = async (order: IOrder): Promise<ISubscription | null> => {
    const admin = await UserModel.findOne({ role: "admin" });
    if (typeof admin?.wallet === "number") admin.wallet += order.amount;
    await admin?.save();

    return (await SubscriptionModel.findOneAndUpdate(
      { name: order.plan },
      {
        $push: {
          users: {
            userEmail: order.userEmail,
            startDate: order.startDate,
            endDate: order.endDate,
          },
        },
      },
      { new: true }
    )) as ISubscription;
  };

  getPaginated = async (params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<any[]> => {
    const query = params.search
      ? { name: { $regex: params.search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    return await SubscriptionModel.find(query)
      .skip(params.skip)
      .limit(params.limit);
  };

  getCount = async (search: string): Promise<number> => {
    const query = search
      ? { name: { $regex: search, $options: "i" }, isDeleted: false }
      : { isDeleted: false };
    return await SubscriptionModel.countDocuments(query);
  };

  checkUserSubscription = async (
    userEmail: string
  ): Promise<ISubscription | null> => {
    const subscription = await SubscriptionModel.findOne({
      "users.userEmail": userEmail,
      isDeleted: false,
      isActive: true,
    });

    return subscription as ISubscription | null;
  };

  findActiveSubscriptions = async (): Promise<ISubscription[]> => {
    return await SubscriptionModel.find({ isActive: true, isDeleted: false });
  };

  updateSubscriptionUsers = async (
    subscriptionId: string,
    users: Array<IUserSubsDetail>
  ): Promise<void> => {
    await SubscriptionModel.updateOne(
      { _id: subscriptionId },
      { $set: { users } }
    );
  };
}
