import { IMenuItemExtra } from "./IMenuItemExtra";

export interface IMenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  menuGroupId?: string;
  menuItemExtras: IMenuItemExtra[];
}
