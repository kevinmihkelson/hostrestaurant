import { AxiosError } from "axios";
import { IRestaurant } from "../domain/IRestaurant";
import { BaseService } from "./BaseService";
import httpClient from "./HttpClient";
import IdentityService from "./IdentityService";

export default class RestaurantService extends BaseService<IRestaurant> {
    constructor() {
        super("restaurant");
    }

    async getRestaurant(): Promise<IRestaurant | undefined> {
        try {
          let response = await httpClient.get(`/restaurant/restaurant`, {
            headers: {
              Authorization: "bearer " + localStorage.getItem("jwt"),
            },
          });
          let res = response.data as IRestaurant;
          return res;
        } catch (e) {
          let response = (e as AxiosError).response!;
          if (response.status == 401 && localStorage.getItem("jwt")) {
            let refreshResponse = await IdentityService.refreshIdentity();
            localStorage.setItem("jwt", refreshResponse.data!.token);
    
            if (!localStorage.getItem("jwt")) return;
    
            let response = await httpClient.get(`/restaurant/restaurant`, {
              headers: {
                Authorization: "bearer " + localStorage.getItem("jwt"),
              },
            });
            let res = response.data as IRestaurant;
            return res;
          }
        }
        return;
      }
}