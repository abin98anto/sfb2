import IOrder from "../entities/IOrder";
import ISubscription, { IUserSubsDetail } from "../entities/ISubscription";

interface SubscriptionInterface {
  add(data: ISubscription): Promise<ISubscription>;
  findDuplicates(name: string): Promise<ISubscription>;
  findById(id: string): Promise<ISubscription>;
  getAll(): Promise<ISubscription[]>;
  update(data: Partial<ISubscription>): Promise<ISubscription>;
  addUser(order: IOrder): Promise<ISubscription | null>;

  getPaginated(params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<any[]>;
  getCount(search: string): Promise<number>;

  checkUserSubscription(userEmail: string): Promise<ISubscription | null>;
  // removeExpiredUsers(currentDate: Date): Promise<void>;
  findActiveSubscriptions(): Promise<ISubscription[]>;
  updateSubscriptionUsers(
    subscriptionId: string,
    users: Array<IUserSubsDetail>
  ): Promise<void>;
}

export default SubscriptionInterface;
