import { IMenu } from "../domain/IMenu";
import { BaseService } from "./BaseService";

export default class MenuService extends BaseService<IMenu> {
    constructor() {
        super("menu");
    }
}