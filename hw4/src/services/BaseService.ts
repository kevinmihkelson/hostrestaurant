import { AxiosError } from "axios";
import httpClient from "./HttpClient";
import IdentityService from "./IdentityService";
import { IServiceResult } from "./IServiceResult";

export class BaseService<TEntity> {
  constructor(private path: string) {}

  async getById(id: string | undefined): Promise<TEntity | undefined> {
    try {
      let response = await httpClient.get(`/${this.path}/${id}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      });
      let res = response.data as TEntity;
      return res;
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && localStorage.getItem("jwt")) {
        let refreshResponse = await IdentityService.refreshIdentity();
        localStorage.setItem("jwt", refreshResponse.data!.token);

        if (!localStorage.getItem("jwt")) return undefined;

        let response = await httpClient.get(`/${this.path}`, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt"),
          },
        });
        let res = response.data as TEntity;
        return res;
      }
    }
    return undefined;
  }

  async delete(id: string): Promise<IServiceResult<void>> {
    let response;
    try {
      response = await httpClient.delete(`/${this.path}/${id}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      });
    } catch (e) {
      let res = {
        status: (e as AxiosError).response!.status,
      };
      return res;
    }
    return { status: response.data };
  }

  async update(entity: TEntity, id: string): Promise<IServiceResult<void>> {
    let response;
    try {
      response = await httpClient.put(`/${this.path}/${id}`, entity, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      });
    } catch (e) {
      let res = {
        status: (e as AxiosError).response!.status,
      };
      return res;
    }
    return { status: response.data };
  }

  async add(entity: TEntity): Promise<IServiceResult<void>> {
    let response;
    try {
      response = await httpClient.post(`/${this.path}`, entity, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      });
    } catch (e) {
      let res = {
        status: (e as AxiosError).response!.status,
      };
      return res;
    }
    return { status: response.status };
  }

  async getAll(): Promise<TEntity[]> {
    try {
      let response = await httpClient.get(`/${this.path}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("jwt"),
        },
      });
      let res = response.data as TEntity[];
      return res;
    } catch (e) {
      let response = (e as AxiosError).response!;
      if (response.status == 401 && localStorage.getItem("jwt")) {
        let refreshResponse = await IdentityService.refreshIdentity();
        localStorage.setItem("jwt", refreshResponse.data!.token);

        if (!localStorage.getItem("jwt")) return [];

        let response = await httpClient.get(`/${this.path}`, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("jwt"),
          },
        });
        let res = response.data as TEntity[];
        return res;
      }
    }
    return [];
  }
}
