import { IMenuItemExtra } from "../domain/IMenuItemExtra";
import { BaseService } from "./BaseService";

export default class MenuItemExtraService extends BaseService<IMenuItemExtra> {
  constructor() {
    super("menuitemextra");
  }
}
