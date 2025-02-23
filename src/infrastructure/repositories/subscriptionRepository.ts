import ISubscription from "../../core/entities/ISubscription";
import SubscriptionInterface from "../../core/interfaces/SubscriptionInterface";
import SubscriptionModel from "../db/schemas/subscriptionSchema";

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

  get = async (id: string): Promise<ISubscription> => {
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

  addUser = async (id: string, userId: string): Promise<ISubscription> => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    return (await SubscriptionModel.findByIdAndUpdate(
      id,
      {
        $push: {
          users: {
            userId,
            startDate,
            endDate,
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
}
