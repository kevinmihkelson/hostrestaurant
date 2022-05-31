import { IMenuItem } from "../domain/IMenuItem";
import { BaseService } from "./BaseService";

export default class MenuItemService extends BaseService<IMenuItem> {
    constructor() {
        super("menuitem");
    }
}