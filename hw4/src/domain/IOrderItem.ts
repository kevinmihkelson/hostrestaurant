import type { IOrderItemExtra } from "./IOrderItemExtra";

export interface IOrderItem {
  menuItemId: string;
  menuItemName: string;
  menuItemPrice: number;
  quantity: number;
  orderItemExtras: IOrderItemExtra[];
}
