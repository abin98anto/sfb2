import ISubscription from "../entities/ISubscription";

interface SubscriptionInterface {
  add(data: ISubscription): Promise<ISubscription>;
  findDuplicates(name: string): Promise<ISubscription>;
  get(id: string): Promise<ISubscription>;
  getAll(): Promise<ISubscription[]>;
  update(data: Partial<ISubscription>): Promise<ISubscription>;
  addUser(id: string, userId: string): Promise<ISubscription>;

  getPaginated(params: {
    skip: number;
    limit: number;
    search: string;
  }): Promise<any[]>;
  getCount(search: string): Promise<number>;
}

export default SubscriptionInterface;
