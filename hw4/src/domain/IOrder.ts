import type { IOrderItem } from "./IOrderItem";

export interface IOrder {
  id: string;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  price: number;
  note?: string;
  clientName: string;
  appUserId: string;
  restaurantId: string;
  restaurantName: string;
  orderItems: IOrderItem[];
}

export enum OrderStatus {
  Sent,
  Cooking,
  Ready,
  Completed,
  Canceled
}

export enum PaymentMethod {
  Cash,
  Card,
}
