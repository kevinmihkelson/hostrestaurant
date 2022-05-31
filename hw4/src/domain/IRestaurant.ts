import { IMenu } from "./IMenu";
import { IOpeningHours } from "./IOpeningHours";
import { IOrder } from "./IOrder";

export interface IRestaurant {
  id?: string;
  appUserId?: string;
  name: string;
  description: string;
  image: string;
  address: string;
  number: string;
  email?: string;
  isActive: boolean;
  orders: IOrder[];
  openingHours: IOpeningHours[];
  restaurantMenus: IMenu[];
}
