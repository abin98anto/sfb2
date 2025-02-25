export default interface IOrder {
  userId: string;
  plan: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  status?: "pending" | "completed" | "failed";
}
