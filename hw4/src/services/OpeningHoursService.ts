import { IOpeningHours } from "../domain/IOpeningHours";
import { BaseService } from "./BaseService";

export default class OpeningHoursService extends BaseService<IOpeningHours> {
    constructor() {
        super("openinghours");
    }
}