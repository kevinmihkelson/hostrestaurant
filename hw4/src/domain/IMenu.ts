import type { IMenuGroup } from "./IMenuGroup";

export interface IMenu {
    restaurantId: string,
    id?: string,
    name: string
    menuGroups?: IMenuGroup[]
}