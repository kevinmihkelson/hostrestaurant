import { IMenuGroup } from "../domain/IMenuGroup";
import { BaseService } from "./BaseService";

export default class MenuGroupService extends BaseService<IMenuGroup> {
    constructor() {
        super("menugroup");
    }
}