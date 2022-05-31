import { AxiosError } from "axios";
import { IOrder } from "../domain/IOrder";
import { BaseService } from "./BaseService";
import httpClient from "./HttpClient";
import IdentityService from "./IdentityService";

export default class OrderService extends BaseService<IOrder> {
  constructor() {
    super("order");
  }

  async patch(id: string, orderStatus: number) {
    let statusForOrder = {
      orderStatus: orderStatus,
    };
    try {
      await httpClient.patch(`/order/${id}`, statusForOrder, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      });
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && localStorage.getItem("jwt")) {
        let refreshResponse = await IdentityService.refreshIdentity();
        localStorage.setItem("jwt", refreshResponse.data!.token);

        if (!localStorage.getItem("jwt")) return ;

        await httpClient.patch(`/order/${id}`, statusForOrder, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt"),
          },
        });
      }
    }
    return;
  }

  async getByRestaurant(id: string): Promise<IOrder[]> {
    try {
      let response = await httpClient.get(`/order/restaurant/${id}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      });
      let res = response.data as IOrder[];
      return res;
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && localStorage.getItem("jwt")) {
        let refreshResponse = await IdentityService.refreshIdentity();
        localStorage.setItem("jwt", refreshResponse.data!.token);

        if (!localStorage.getItem("jwt")) return [];

        let response = await httpClient.get(`/orders/restaurant/${id}`, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt"),
          },
        });
        let res = response.data as IOrder[];
        return res;
      }
    }
    return [];
  }
}
