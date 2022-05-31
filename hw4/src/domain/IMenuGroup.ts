import { IMenuItem } from "./IMenuItem";

export interface IMenuGroup {
  id?: string;
  name: string;
  menuId?: string;
  menuItems: IMenuItem[];
}
